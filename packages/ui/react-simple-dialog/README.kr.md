# @hensley-ui/react-simple-dialog

> Promise 기반의 간단하고 직관적인 다이얼로그 컴포넌트

ShadCN Dialog의 편의성을 대폭 개선한 React 다이얼로그 라이브러리입니다. 복잡한 상태 관리 없이 간단한 함수 호출만으로 사용자 확인 다이얼로그를 구현할 수 있습니다.

## 🌏 언어
- [English](README.md)

## 🚀 주요 특징

- **Promise 기반 API**: `await` 키워드로 사용자 응답을 직관적으로 처리
- **명령형(Imperative) 접근**: 함수 호출만으로 다이얼로그 실행
- **동적 콘텐츠**: 런타임에 제목, 설명, 버튼 텍스트 등을 자유롭게 설정
- **상태 관리 자동화**: 내부적으로 모든 상태 관리가 처리됨
- **한국어 지원**: 기본적으로 "확인", "취소" 한국어 버튼 지원
- **TypeScript 완전 지원**: 타입 안전성 보장

## 📦 설치

```bash
npm install @hensley-ui/react-simple-dialog
# 또는
pnpm add @hensley-ui/react-simple-dialog
```

## 🎯 ShadCN Dialog와의 비교

### ❌ ShadCN Dialog의 문제점

```tsx
// 복잡한 선언적 구조
const [isOpen, setIsOpen] = useState(false)
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")

const handleDelete = async () => {
  // 상태 업데이트 필요
  setTitle("삭제 확인")
  setDescription("정말 삭제하시겠습니까?")
  setIsOpen(true)
  
  // 사용자 응답 처리가 복잡함
  // 별도의 onConfirm, onCancel 핸들러 필요
}

return (
  <>
    <Button onClick={handleDelete}>삭제</Button>
    
    {/* JSX에 모든 다이얼로그 구조를 미리 선언해야 함 */}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            취소
          </Button>
          <Button onClick={() => {
            // 실제 삭제 로직
            setIsOpen(false)
          }}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </>
)
```

### ✅ SimpleDialog의 편의성

```tsx
// 간단하고 직관적인 명령형 API
const openDialog = useSimpleDialog()

const handleDelete = async () => {
  const confirmed = await openDialog({
    title: "삭제 확인",
    description: "정말 삭제하시겠습니까?",
    confirmButton: "확인",
    cancelButton: "취소",
  })
  
  if (confirmed) {
    // 실제 삭제 로직
    console.log("삭제됨!")
  }
}

return <Button onClick={handleDelete}>삭제</Button>
```

### 🔄 편의성 개선 사항

| 항목 | ShadCN Dialog | SimpleDialog |
|------|---------------|--------------|
| **상태 관리** | 수동 (useState, onOpenChange) | 자동 (내부 처리) |
| **사용자 응답 처리** | 복잡 (별도 핸들러) | 직관적 (Promise resolve) |
| **동적 콘텐츠** | 어려움 (상태 업데이트) | 쉬움 (매개변수로 전달) |
| **코드 길이** | 길고 복잡 | 짧고 간결 |
| **JSX 구조** | 미리 선언 필요 | 불필요 |
| **비동기 처리** | 콜백 기반 | Promise 기반 |

## 🛠 사용법

### 1. Provider 설정

```tsx
import { SimpleDialogProvider } from '@hensley-ui/react-simple-dialog'

function App() {
  return (
    <SimpleDialogProvider>
      <YourApp />
    </SimpleDialogProvider>
  )
}
```

### 2. 기본 사용

```tsx
import { useSimpleDialog } from '@hensley-ui/react-simple-dialog'

function DeleteButton() {
  const openDialog = useSimpleDialog()

  const handleClick = async () => {
    const result = await openDialog({
      title: "삭제 확인",
      description: "이 항목을 삭제하시겠습니까?",
      confirmButton: "삭제",
      cancelButton: "취소",
    })

    if (result) {
      console.log("사용자가 확인을 눌렀습니다")
      // 삭제 로직 실행
    } else {
      console.log("사용자가 취소를 눌렀습니다")
    }
  }

  return <button onClick={handleClick}>삭제</button>
}
```

### 3. 커스텀 버튼

문자열 대신 React 엘리먼트를 전달할 수 있습니다:

```tsx
const result = await openDialog({
  title: "계정 삭제",
  description: "이 작업은 되돌릴 수 없습니다.",
  confirmButton: <span style={{ color: 'red' }}>영구 삭제</span>,
  cancelButton: <span>취소</span>,
})
```

## 📋 API 참조

### SimpleDialogType

```typescript
type SimpleDialogType = {
  title: string | ReactNode           // 다이얼로그 제목
  description: string | ReactNode     // 다이얼로그 설명
  confirmButton: string | ReactNode   // 확인 버튼 (기본: "확인")
  cancelButton: string | ReactNode    // 취소 버튼 (기본: "취소")
  onConfirm?: () => void             // 확인 시 추가 콜백 (선택사항)
  onCancel?: () => void              // 취소 시 추가 콜백 (선택사항)
}
```

### useSimpleDialog()

Promise를 반환하는 다이얼로그 열기 함수를 반환합니다.

**반환값**: `(props: SimpleDialogType) => Promise<boolean>`

- `true`: 사용자가 확인 버튼을 클릭한 경우
- `false`: 사용자가 취소 버튼을 클릭하거나 다이얼로그를 닫은 경우

## 🌟 사용 사례

### 삭제 확인

```tsx
const handleDelete = async () => {
  const confirmed = await openDialog({
    title: "항목 삭제",
    description: "선택한 항목을 삭제하시겠습니까?",
    confirmButton: "삭제",
    cancelButton: "취소",
  })

  if (confirmed) {
    await deleteItem(itemId)
    showSuccessMessage("항목이 삭제되었습니다")
  }
}
```

### 폼 제출 확인

```tsx
const handleSubmit = async () => {
  const confirmed = await openDialog({
    title: "양식 제출",
    description: "입력한 정보로 양식을 제출하시겠습니까?",
    confirmButton: "제출",
    cancelButton: "계속 편집",
  })

  if (confirmed) {
    await submitForm(formData)
    navigate('/success')
  }
}
```

### 로그아웃 확인

```tsx
const handleLogout = async () => {
  const confirmed = await openDialog({
    title: "로그아웃",
    description: "정말 로그아웃 하시겠습니까?",
    confirmButton: "로그아웃",
    cancelButton: "취소",
  })

  if (confirmed) {
    await logout()
    navigate('/login')
  }
}
```

## 🎨 스타일링

이 컴포넌트는 TailwindCSS와 ShadCN 디자인 시스템을 기반으로 구축되었습니다. 필요에 따라 CSS 클래스를 오버라이드하여 스타일을 커스터마이징할 수 있습니다.

## 🤝 기여

개선 사항이나 버그 리포트가 있으시면 언제든 이슈를 등록해 주세요.

## 📄 라이선스

MIT License