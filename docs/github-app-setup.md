# GitHub App을 활용한 자동 코드리뷰 설정

## 1. GitHub App 생성

1. GitHub에서 Settings > Developer settings > GitHub Apps로 이동
2. "New GitHub App" 클릭
3. 다음 권한 설정:
   - Repository permissions:
     - Pull requests: Read & Write
     - Contents: Read
     - Issues: Read & Write
   - Subscribe to events:
     - Pull request

## 2. Webhook 설정

GitHub App이 PR 이벤트를 받을 수 있도록 webhook 엔드포인트 설정이 필요합니다.

## 3. 환경변수 설정

GitHub Actions Secrets에 다음을 추가:

- `GITHUB_APP_ID`: GitHub App ID
- `GITHUB_APP_PRIVATE_KEY`: GitHub App private key
- `GITHUB_PAT`: Personal Access Token
- `SLACK_BOT_TOKEN`: Slack Bot Token
- `SLACK_TEAM_ID`: Slack Team ID
- `SLACK_CHANNEL_IDS`: Slack Channel IDs
- `OPENAI_API_KEY`: OpenAI API Key

## 4. 장점

- 더 세밀한 이벤트 제어 가능
- 특정 조건에서만 코드리뷰 실행
- 커스텀 로직 추가 가능
- 실시간 응답 가능
