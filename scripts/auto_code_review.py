#!/usr/bin/env python3
"""
자동 코드리뷰 스크립트
GitHub Actions에서 실행되어 PR에 대한 자동 코드리뷰를 수행합니다.
"""

import os
import sys
import argparse
import asyncio
import json
from datetime import datetime
from dotenv import load_dotenv
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import HumanMessage
import tiktoken  # 토큰 카운팅을 위해 추가

# 환경변수 로드
load_dotenv()

def count_tokens(text, model="gpt-4"):
    """텍스트의 토큰 수를 계산합니다."""
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except:
        # 대략적인 추정: 1 토큰 ≈ 4 문자
        return len(text) // 4

def estimate_pr_tokens(pr_info):
    """PR 정보의 대략적인 토큰 수를 추정합니다."""
    estimated_tokens = 0
    
    # 기본 PR 정보
    if pr_info.get('title'):
        estimated_tokens += count_tokens(pr_info['title'])
    if pr_info.get('body'):
        estimated_tokens += count_tokens(pr_info['body'])
    
    # 변경된 파일들 (대략적 추정)
    # 각 파일당 평균 1000 토큰으로 가정
    changed_files = pr_info.get('changed_files', 0)
    estimated_tokens += changed_files * 1000
    
    return estimated_tokens

async def setup_mcp_client():
    """MCP 클라이언트 설정"""
    github_pat = os.getenv("GITHUB_PAT")
    # slack_bot_token = os.getenv("SLACK_BOT_TOKEN")
    # slack_team_id = os.getenv("SLACK_TEAM_ID")
    # slack_channel_ids = os.getenv("SLACK_CHANNEL_IDS")
    
    if not github_pat:
        raise ValueError("GITHUB_PAT 환경변수가 설정되지 않았습니다.")
    
    mcp_config = {
        "github": {
            "command": "docker",
            "args": [
                "run", "-i", "--rm",
                "-e", "GITHUB_TOOLSETS",
                "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
                "ghcr.io/github/github-mcp-server"
            ],
            "env": {
                "GITHUB_TOOLSETS": "context,pull_requests",
                "GITHUB_PERSONAL_ACCESS_TOKEN": github_pat
            },
            "transport": "stdio"
        }
    }
    
    # Slack 관련 설정 주석 처리
    # if all([slack_bot_token, slack_team_id, slack_channel_ids]):
    #     mcp_config["slack"] = {
    #         "command": "docker",
    #         "args": [
    #             "run", "-i", "--rm",
    #             "-e", "SLACK_BOT_TOKEN",
    #             "-e", "SLACK_TEAM_ID",
    #             "-e", "SLACK_CHANNEL_IDS",
    #             "mcp/slack"
    #         ],
    #         "env": {
    #             "SLACK_BOT_TOKEN": slack_bot_token,
    #             "SLACK_TEAM_ID": slack_team_id,
    #             "SLACK_CHANNEL_IDS": slack_channel_ids
    #         },
    #         "transport": "stdio"
    #     }
    
    mcp_client = MultiServerMCPClient(mcp_config)
    return mcp_client

async def process_stream(stream_generator):
    """스트림 처리 함수"""
    results = []
    try:
        async for chunk in stream_generator:
            key = list(chunk.keys())[0]
            if key == 'agent':
                content = chunk['agent']['messages'][0].content if chunk['agent']['messages'][0].content != '' else chunk['agent']['messages'][0].additional_kwargs
                print(f"'agent': '{content}'")
            elif key == 'tools':
                for tool_msg in chunk['tools']['messages']:
                    print(f"'tools': '{tool_msg.content}'")
            results.append(chunk)
        return results
    except Exception as e:
        print(f"Error processing stream: {e}")
        return results

def save_review_result(owner, repo, pr_number, review_content, output_dir="review_results"):
    """코드리뷰 결과를 파일로 저장"""
    try:
        # 결과 디렉토리 생성
        os.makedirs(output_dir, exist_ok=True)
        
        # 파일명 생성
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{owner}_{repo}_PR{pr_number}_{timestamp}.json"
        filepath = os.path.join(output_dir, filename)
        
        # 결과 데이터 구성
        review_data = {
            "metadata": {
                "owner": owner,
                "repo": repo,
                "pr_number": pr_number,
                "reviewed_at": datetime.now().isoformat(),
                "timestamp": timestamp
            },
            "review_content": review_content
        }
        
        # JSON 파일로 저장
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(review_data, f, ensure_ascii=False, indent=2)
        
        print(f"📄 리뷰 결과가 저장되었습니다: {filepath}")
        return filepath
        
    except Exception as e:
        print(f"❌ 리뷰 결과 저장 중 오류: {e}")
        return None

async def run_code_review(owner, repo, pr_number, pr_url):
    """코드리뷰 실행"""
    try:
        print(f"코드리뷰 시작: {owner}/{repo} PR #{pr_number}")
        
        # PR 정보 가져오기 (간단한 버전)
        try:
            import subprocess
            result = subprocess.run(
                ["gh", "pr", "view", str(pr_number), "--json", "title,body,changedFiles"],
                capture_output=True,
                text=True,
                check=True
            )
            pr_info = json.loads(result.stdout)
            
            # 토큰 수 추정
            estimated_tokens = estimate_pr_tokens(pr_info)
            print(f"예상 토큰 수: {estimated_tokens}")
            
            # 토큰 제한 체크 (30,000 토큰)
            if estimated_tokens > 25000:  # 여유분을 두고 체크
                print(f"⚠️ 토큰 제한 초과 예상 ({estimated_tokens} > 25000)")
                print("🚫 코드리뷰를 건너뜁니다.")
                
                # 간단한 메시지만 작성
                simple_message = f"""## 🤖 AI 자동 코드리뷰

PR #{pr_number}의 변경사항이 너무 커서 자동 코드리뷰를 건너뜁니다.

**이유**: 토큰 제한 초과 (예상 {estimated_tokens} 토큰)

**권장사항**: 
- 수동으로 코드리뷰를 진행해주세요
- 또는 PR을 더 작은 단위로 나누어주세요

---
*AI 자동 코드리뷰 시스템*"""
                
                # PR에 코멘트 작성
                subprocess.run([
                    "gh", "pr", "comment", str(pr_number), 
                    "--body", simple_message
                ], check=True)
                
                return True
                
        except subprocess.CalledProcessError as e:
            print(f"GitHub CLI 오류: {e}")
            print("GitHub CLI가 설치되어 있고 로그인되어 있는지 확인하세요.")
        except Exception as e:
            print(f"PR 정보 가져오기 실패: {e}")
        
        # MCP 클라이언트 설정
        mcp_client = await setup_mcp_client()
        
        # 도구 목록 가져오기
        tools = await mcp_client.get_tools()
        
        # 에이전트 생성
        agent = create_react_agent(
            model="openai:gpt-4o-mini",  # 더 가벼운 모델 사용
            tools=tools,
            prompt="Use the tools provided to you to answer the user's question"
        )
        
        # 코드리뷰 요청 메시지 생성 (간소화)
        human_message = f"""PR #{pr_number}의 코드를 간단히 리뷰해주세요.
        
        주요 변경사항만 확인하고 간결한 코멘트를 작성해주세요.
        
        PR URL: {pr_url}"""
        
        print("코드리뷰 실행 중...")
        
        # 스트림 처리
        result = await process_stream(agent.astream({"messages": [HumanMessage(content=human_message)]}))
        
        # 결과 저장
        if result:
            save_review_result(owner, repo, pr_number, str(result))
        
        print("코드리뷰 완료!")
        return True
        
    except Exception as e:
        print(f"코드리뷰 실행 중 오류 발생: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='자동 코드리뷰 스크립트')
    parser.add_argument('--owner', required=True, help='GitHub 저장소 소유자')
    parser.add_argument('--repo', required=True, help='GitHub 저장소 이름')
    parser.add_argument('--pr-number', required=True, type=int, help='PR 번호')
    parser.add_argument('--pr-url', required=True, help='PR URL')
    
    args = parser.parse_args()
    
    print(f"코드리뷰 시작: {args.owner}/{args.repo} PR #{args.pr_number}")
    
    # 비동기 실행
    success = asyncio.run(run_code_review(
        args.owner, 
        args.repo, 
        args.pr_number, 
        args.pr_url
    ))
    
    if success:
        print("코드리뷰가 성공적으로 완료되었습니다.")
        sys.exit(0)
    else:
        print("코드리뷰 실행 중 오류가 발생했습니다.")
        sys.exit(1)

if __name__ == "__main__":
    main()
