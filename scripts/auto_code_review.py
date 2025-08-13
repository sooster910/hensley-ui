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

# 환경변수 로드
load_dotenv()

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

async def run_code_review(owner, repo, pr_number, pr_url, save_result=True):
    """코드리뷰 실행"""
    try:
        # MCP 클라이언트 설정
        mcp_client = await setup_mcp_client()
        
        # 도구 목록 가져오기
        tool_list = await mcp_client.get_tools()
        
        # 에이전트 생성
        agent = create_react_agent(
            model="openai:gpt-4.1",
            tools=tool_list,
            prompt="Use the tools provided to you to answer the user's question"
        )
        
        # 코드리뷰 요청 메시지 생성 (Slack 관련 부분 제거)
        human_message = f"""깃헙의 Pull Request를 확인하고 코드 리뷰를 작성해주세요. 
PR의 코드를 리뷰한 후에, 아래 항목을 확인해주세요;
1. 코드가 개선되었는지
2. 예측하지 못한 side effect가 있는지
3. 보안상 문제가 될 수 있는 부분이 없는지

위 내용을 확인해서 PR에 코멘트로 남겨주세요.

PR URL: {pr_url}"""
        
        # 스트림 실행
        stream_generator = agent.astream(
            {"messages": [HumanMessage(human_message)]}, 
            stream_mode="updates"
        )
        
        # 결과 처리
        all_chunks = await process_stream(stream_generator)
        
        if all_chunks:
            final_result = all_chunks[-1]
            print("\nFinal result:", final_result)
            
            # 리뷰 내용 추출
            review_content = None
            if 'agent' in final_result and 'messages' in final_result['agent']:
                for message in final_result['agent']['messages']:
                    if hasattr(message, 'content') and message.content:
                        review_content = message.content
                        break
            
            # 결과 저장
            if save_result and review_content:
                save_review_result(owner, repo, pr_number, review_content)
            
            return True
        else:
            print("No results from code review")
            return False
            
    except Exception as e:
        print(f"코드리뷰 실행 중 오류 발생: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='자동 코드리뷰 스크립트')
    parser.add_argument('--owner', required=True, help='GitHub 저장소 소유자')
    parser.add_argument('--repo', required=True, help='GitHub 저장소 이름')
    parser.add_argument('--pr-number', required=True, type=int, help='PR 번호')
    parser.add_argument('--pr-url', required=True, help='PR URL')
    parser.add_argument('--no-save', action='store_true', help='결과를 파일로 저장하지 않음')
    
    args = parser.parse_args()
    
    print(f"코드리뷰 시작: {args.owner}/{args.repo} PR #{args.pr_number}")
    
    # 비동기 실행
    success = asyncio.run(run_code_review(
        args.owner, 
        args.repo, 
        args.pr_number, 
        args.pr_url,
        save_result=not args.no_save
    ))
    
    if success:
        print("코드리뷰가 성공적으로 완료되었습니다.")
        sys.exit(0)
    else:
        print("코드리뷰 실행 중 오류가 발생했습니다.")
        sys.exit(1)

if __name__ == "__main__":
    main()
