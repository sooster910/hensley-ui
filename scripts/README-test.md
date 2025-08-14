# 코드리뷰 테스트 스크립트 사용법

## 개요

`test_code_review.py` 스크립트는 로컬에서 자동 코드리뷰 기능을 테스트할 수 있는 도구입니다.

## 사용법

### 1. 최신 PR로 테스트

```bash
python scripts/test_code_review.py
```

- 현재 저장소의 가장 최근에 생성된 PR을 자동으로 찾아서 테스트합니다.

### 2. 특정 PR 번호로 테스트

```bash
python scripts/test_code_review.py --pr 123
```

- PR 번호 123을 지정하여 테스트합니다.

### 3. 도움말 보기

```bash
python scripts/test_code_review.py --help
```

## 사전 요구사항

### 1. GitHub CLI 설치 및 로그인

```bash
# macOS
brew install gh

# 로그인
gh auth login
```

### 2. 환경변수 설정

`.env` 파일에 다음 환경변수들이 설정되어 있어야 합니다:

```bash
GITHUB_PAT=your_github_personal_access_token
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_TEAM_ID=your_slack_team_id
SLACK_CHANNEL_IDS=channel_id1,channel_id2
OPENAI_API_KEY=your_openai_api_key
```

### 3. Python 패키지 설치

```bash
pip install -r requirements.txt
```

## 동작 과정

1. **저장소 정보 확인**: `git remote`에서 현재 저장소의 owner/repo 정보를 추출
2. **PR 정보 가져오기**: GitHub CLI를 사용하여 PR 정보를 가져옴
3. **MCP 서버 실행**: GitHub 및 Slack MCP 서버를 Docker로 실행
4. **코드리뷰 수행**: OpenAI GPT-4를 사용하여 코드 분석
5. **결과 확인**: PR에 리뷰 코멘트가 작성되었는지 확인

## 예시 출력

```
🔍 저장소 정보 확인 중...
📁 저장소: hyunsujoo/hensley-ui
🔍 최신 PR 확인 중...
📋 테스트할 PR: #15 - 새로운 기능 추가
🔗 URL: https://github.com/hyunsujoo/hensley-ui/pull/15
🚀 테스트 코드리뷰 시작...
'agent': '코드리뷰를 시작하겠습니다...'
'tools': 'PR 정보를 가져왔습니다...'
✅ 테스트 성공!
📝 PR #15에 리뷰 코멘트가 작성되었습니다.
```

## 문제 해결

### GitHub CLI 오류

```bash
# GitHub CLI 상태 확인
gh auth status

# 다시 로그인
gh auth login
```

### Docker 오류

```bash
# Docker 실행 상태 확인
docker ps

# Docker 권한 문제 해결
sudo usermod -aG docker $USER
```

### 환경변수 오류

```bash
# .env 파일 존재 확인
ls -la .env

# 환경변수 로드 확인
python -c "from dotenv import load_dotenv; load_dotenv(); import os; print('GITHUB_PAT:', bool(os.getenv('GITHUB_PAT')))"
```

## 팁

- 테스트 전에 PR이 실제로 존재하는지 확인하세요
- 환경변수가 올바르게 설정되어 있는지 확인하세요
- Docker가 실행 중인지 확인하세요
- 네트워크 연결이 안정적인지 확인하세요
