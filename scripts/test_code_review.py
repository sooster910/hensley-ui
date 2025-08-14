#!/usr/bin/env python3
"""
로컬 테스트용 코드리뷰 스크립트
현재 저장소의 최신 PR을 자동으로 가져와서 테스트합니다.
"""

import asyncio
import os
import subprocess
import json
import argparse
from auto_code_review import run_code_review

def get_pr_by_number(pr_number):
    """특정 번호의 PR 정보를 가져옵니다."""
    try:
        result = subprocess.run(
            ["gh", "pr", "view", str(pr_number), "--json", "number,url,title,headRefName"],
            capture_output=True,
            text=True,
            check=True
        )
        
        pr = json.loads(result.stdout)
        print(f"📋 테스트할 PR: #{pr['number']} - {pr['title']}")
        print(f"🔗 URL: {pr['url']}")
        
        return {
            'number': pr['number'],
            'url': pr['url'],
            'title': pr['title'],
            'branch': pr['headRefName']
        }
        
    except subprocess.CalledProcessError as e:
        print(f"❌ PR #{pr_number}을 찾을 수 없습니다: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ JSON 파싱 오류: {e}")
        return None

def get_latest_pr():
    """현재 저장소의 최신 PR 정보를 가져옵니다."""
    try:
        # GitHub CLI를 사용하여 최신 PR 정보 가져오기
        result = subprocess.run(
            ["gh", "pr", "list", "--limit", "1", "--json", "number,url,title,headRefName"],
            capture_output=True,
            text=True,
            check=True
        )
        
        prs = json.loads(result.stdout)
        if not prs:
            print("❌ 열린 PR이 없습니다.")
            return None
            
        pr = prs[0]
        print(f"📋 테스트할 PR: #{pr['number']} - {pr['title']}")
        print(f"🔗 URL: {pr['url']}")
        
        return {
            'number': pr['number'],
            'url': pr['url'],
            'title': pr['title'],
            'branch': pr['headRefName']
        }
        
    except subprocess.CalledProcessError as e:
        print(f"❌ GitHub CLI 오류: {e}")
        print("GitHub CLI가 설치되어 있고 로그인되어 있는지 확인하세요.")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ JSON 파싱 오류: {e}")
        return None

def get_repo_info():
    """현재 저장소 정보를 가져옵니다."""
    try:
        # git remote에서 저장소 정보 추출
        result = subprocess.run(
            ["git", "remote", "get-url", "origin"],
            capture_output=True,
            text=True,
            check=True
        )
        
        remote_url = result.stdout.strip()
        
        # SSH 또는 HTTPS URL에서 owner/repo 추출
        if remote_url.startswith('git@github.com:'):
            # SSH 형식: git@github.com:owner/repo.git
            repo_path = remote_url.replace('git@github.com:', '').replace('.git', '')
        elif remote_url.startswith('https://github.com/'):
            # HTTPS 형식: https://github.com/owner/repo.git
            repo_path = remote_url.replace('https://github.com/', '').replace('.git', '')
        else:
            print(f"❌ 지원하지 않는 remote URL 형식: {remote_url}")
            return None
            
        owner, repo = repo_path.split('/', 1)
        return {'owner': owner, 'repo': repo}
        
    except subprocess.CalledProcessError as e:
        print(f"❌ git remote 오류: {e}")
        return None

def get_test_pr_info():
    """테스트용 PR 정보를 반환합니다."""
    return {
        'owner': 'sooster910',
        'repo': 'hensley-ui',
        'number': 29,
        'url': 'https://github.com/sooster910/hensley-ui/pull/29'
    }

async def test_code_review(pr_number=None, use_test_data=False, save_result=True):
    """테스트용 코드리뷰 실행"""
    
    if use_test_data:
        print("🧪 테스트 데이터를 사용합니다.")
        repo_info = {'owner': 'sooster910', 'repo': 'hensley-ui'}
        pr_info = get_test_pr_info()
    else:
        print("🔍 저장소 정보 확인 중...")
        repo_info = get_repo_info()
        if not repo_info:
            print("❌ 저장소 정보를 가져올 수 없습니다.")
            return
        
        print(f"📁 저장소: {repo_info['owner']}/{repo_info['repo']}")
        
        # PR 정보 가져오기
        if pr_number:
            print(f"🔍 PR #{pr_number} 확인 중...")
            pr_info = get_pr_by_number(pr_number)
        else:
            print("🔍 최신 PR 확인 중...")
            pr_info = get_latest_pr()
        
        if not pr_info:
            print("❌ 테스트할 PR을 찾을 수 없습니다.")
            return
    
    print(f"📋 테스트할 PR: #{pr_info['number']}")
    if 'title' in pr_info:
        print(f"📝 제목: {pr_info['title']}")
    print(f"🔗 URL: {pr_info['url']}")
    
    print("🚀 테스트 코드리뷰 시작...")
    
    success = await run_code_review(
        repo_info['owner'], 
        repo_info['repo'], 
        pr_info['number'], 
        pr_info['url'],
        save_result=save_result
    )
    
    if success:
        print("✅ 테스트 성공!")
        print(f"📝 PR #{pr_info['number']}에 리뷰 코멘트가 작성되었습니다.")
        if save_result:
            print("📄 리뷰 결과가 review_results 폴더에 저장되었습니다.")
    else:
        print("❌ 테스트 실패!")

def main():
    parser = argparse.ArgumentParser(description='로컬 테스트용 코드리뷰 스크립트')
    parser.add_argument('--pr', type=int, help='테스트할 PR 번호 (지정하지 않으면 최신 PR 사용)')
    parser.add_argument('--test-data', action='store_true', help='테스트 데이터 사용 (PR이 없을 때)')
    parser.add_argument('--no-save', action='store_true', help='결과를 파일로 저장하지 않음')
    
    args = parser.parse_args()
    
    asyncio.run(test_code_review(args.pr, args.test_data, save_result=not args.no_save))

if __name__ == "__main__":
    main()
