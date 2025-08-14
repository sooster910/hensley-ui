# 자동 코드리뷰 설정 가이드

## 개요

이 프로젝트는 MCP(Model Context Protocol)를 활용하여 GitHub PR에 대한 자동 코드리뷰를 수행하는 시스템입니다.

**현재 상태**: Slack 알림 기능은 비활성화되어 있으며, GitHub PR 코멘트만 작성됩니다.

## 설정 방법

### 1. 환경변수 설정

#### 방법 1: .env.example 템플릿 사용 (권장)

```bash
# 1. 템플릿 파일을 .env로 복사
cp .env.example .env

# 2. .env 파일을 편집하여 실제 토큰들을 입력
# 예: GITHUB_PAT=ghp_xxxxxxxxxxxxxxxxxxxx
```

#### 방법 2: 직접 .env 파일 생성

`.env` 파일을 생성하고 다음 환경변수들을 설정하세요:

```bash
# GitHub 설정
GITHUB_PAT=your_github_personal_access_token

# OpenAI 설정
OPENAI_API_KEY=your_openai_api_key

# Slack 설정 (현재 비활성화됨)
# SLACK_BOT_TOKEN=your_slack_bot_token
# SLACK_TEAM_ID=your_slack_team_id
# SLACK_CHANNEL_IDS=channel_id1,channel_id2
```

### 2. 필요한 토큰 및 권한

#### GitHub Personal Access Token

- **생성 위치**: https://github.com/settings/tokens
- **필요 권한**: `repo`, `pull_requests`, `issues`
- **설명**: PR 정보를 읽고 리뷰 코멘트를 작성하기 위해 필요

#### OpenAI API Key

- **생성 위치**: https://platform.openai.com/api-keys
- **설명**: GPT-4를 사용한 코드 분석을 위해 필요

#### Slack Bot Token (현재 비활성화됨)

- **생성 위치**: https://api.slack.com/apps
- **필요 권한**: `chat:write`, `channels:read`
- **설명**: 리뷰 완료 알림을 Slack 채널에 전송하기 위해 필요 (현재 사용하지 않음)

### 3. GitHub Actions Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 추가하세요:

- `GITHUB_PAT`
- `OPENAI_API_KEY`
- `SLACK_BOT_TOKEN` (선택사항, 현재 비활성화됨)
- `SLACK_TEAM_ID` (선택사항, 현재 비활성화됨)
- `SLACK_CHANNEL_IDS` (선택사항, 현재 비활성화됨)

### 4. Docker 설치 확인

MCP 서버들이 Docker 컨테이너로 실행되므로 Docker가 설치되어 있어야 합니다.

### 5. 테스트 실행

```bash
# 의존성 설치
pip install -r requirements.txt

# 로컬 테스트 (테스트 데이터 사용)
python scripts/test_code_review.py --test-data

# 로컬 테스트 (실제 PR 사용)
python scripts/test_code_review.py

# 특정 PR 번호로 테스트
python scripts/test_code_review.py --pr 123
```

## 동작 방식

1. **PR 생성/업데이트**: GitHub Actions가 PR 이벤트를 감지
2. **MCP 서버 실행**: GitHub MCP 서버를 Docker로 실행
3. **코드리뷰 수행**: OpenAI GPT-4를 사용하여 코드 분석
4. **리뷰 코멘트 작성**: PR에 자동으로 리뷰 코멘트 작성
5. **Slack 알림**: 현재 비활성화됨

## 커스터마이징

### 리뷰 기준 수정

`scripts/auto_code_review.py`의 `human_message` 부분을 수정하여 리뷰 기준을 변경할 수 있습니다.

### Slack 알림 활성화

Slack 알림을 다시 활성화하려면:

1. `scripts/auto_code_review.py`에서 Slack 관련 주석을 해제
2. `.github/workflows/auto-code-review.yml`에서 Slack 환경변수 주석 해제
3. `.env` 파일에 Slack 토큰들 설정

### 특정 파일만 리뷰

GitHub Actions 워크플로우에 조건을 추가하여 특정 파일이 변경된 경우에만 리뷰를 실행할 수 있습니다.

## 문제 해결

### Docker 권한 오류

```bash
sudo usermod -aG docker $USER
```

### MCP 서버 연결 실패

- Docker가 실행 중인지 확인
- 네트워크 연결 상태 확인
- 환경변수가 올바르게 설정되었는지 확인

### OpenAI API 오류

- API 키가 유효한지 확인
- API 사용량 한도 확인
- 모델명이 올바른지 확인

### 환경변수 오류

```bash
# .env 파일 존재 확인
ls -la .env

# 환경변수 로드 확인
python -c "from dotenv import load_dotenv; load_dotenv(); import os; print('GITHUB_PAT:', bool(os.getenv('GITHUB_PAT')))"
```

## 모니터링

GitHub Actions 탭에서 워크플로우 실행 상태를 확인할 수 있습니다.

## 비용 고려사항

- OpenAI API 사용량에 따른 비용 발생
- GitHub Actions 실행 시간에 따른 비용 발생 (공개 저장소는 무료)
- Docker 컨테이너 실행 비용

## 보안 고려사항

- GitHub PAT는 최소 권한으로 설정
- Slack Bot Token은 필요한 채널만 접근 가능하도록 설정
- 환경변수는 절대 코드에 하드코딩하지 않음
- `.env` 파일은 절대 Git에 커밋하지 않음
