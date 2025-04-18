import type { Meta, StoryObj } from '@storybook/react'
import { overlay } from 'overlay-kit'

import { useState } from 'react'

import { Button } from '@components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'

const meta: Meta = {
  title: 'UI Component/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Dialog

Dialog는 사용자에게 중요한 정보를 보여주거나 확인이 필요한 작업을 수행할 때 사용되는 모달 컴포넌트입니다.

## Features
- 접근성 지원 (ARIA attributes)
- 키보드 네비게이션
- 포커스 트랩
- 애니메이션
- 반응형 디자인

## API Reference

### Dialog
\`\`\`tsx
<Dialog>
  <DialogTrigger />
  <DialogContent />
</Dialog>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | - | 다이얼로그의 열림/닫힘 상태를 제어합니다. |
| onOpenChange | (open: boolean) => void | - | 다이얼로그의 상태가 변경될 때 호출되는 콜백 함수입니다. |
| modal | boolean | true | 다이얼로그가 모달인지 여부를 결정합니다. |
| defaultOpen | boolean | false | 다이얼로그의 초기 열림 상태를 설정합니다. |

### DialogTrigger
\`\`\`tsx
<DialogTrigger asChild>
  <Button>다이얼로그 열기</Button>
</DialogTrigger>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | boolean | false | 자식 컴포넌트를 트리거로 사용합니다. |

### DialogContent
\`\`\`tsx
<DialogContent>
  <DialogHeader />
  <DialogFooter />
</DialogContent>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onPointerDownOutside | (event: PointerDownOutsideEvent) => void | - | 다이얼로그 외부를 클릭했을 때 호출되는 콜백 함수입니다. |
| onInteractOutside | (event: FocusOutsideEvent \| PointerDownOutsideEvent) => void | - | 다이얼로그 외부와 상호작용할 때 호출되는 콜백 함수입니다. |
| onEscapeKeyDown | (event: KeyboardEvent) => void | - | ESC 키를 눌렀을 때 호출되는 콜백 함수입니다. |
| forceMount | boolean | - | 다이얼로그가 마운트된 상태를 강제로 유지합니다. |

### DialogHeader
\`\`\`tsx
<DialogHeader>
  <DialogTitle />
  <DialogDescription />
</DialogHeader>
\`\`\`

### DialogTitle
\`\`\`tsx
<DialogTitle>제목</DialogTitle>
\`\`\`

### DialogDescription
\`\`\`tsx
<DialogDescription>설명</DialogDescription>
\`\`\`

### DialogFooter
\`\`\`tsx
<DialogFooter>
  <Button>확인</Button>
</DialogFooter>
\`\`\`

### DialogClose
\`\`\`tsx
<DialogClose asChild>
  <Button>닫기</Button>
</DialogClose>
\`\`\`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | boolean | false | 자식 컴포넌트를 닫기 버튼으로 사용합니다. |

## Usage
\`\`\`tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'

const MyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            다이얼로그 설명이 들어갑니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    open: {
      description: '다이얼로그의 열림/닫힘 상태를 제어합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onOpenChange: {
      description: '다이얼로그의 상태가 변경될 때 호출되는 콜백 함수입니다.',
      control: false,
      table: {
        type: { summary: '(open: boolean) => void' },
        defaultValue: { summary: 'undefined' },
      },
    },
    modal: {
      description: '다이얼로그가 모달인지 여부를 결정합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    defaultOpen: {
      description: '다이얼로그의 초기 열림 상태를 설정합니다.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

// 기본 다이얼로그
const BasicDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <h1>Controlled</h1>
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        다이얼로그 열기
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>기본 다이얼로그</DialogTitle>
            <DialogDescription>
              이것은 기본적인 다이얼로그 예시입니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button onClick={() => setIsOpen(false)} className="btn-cancel">
              취소
            </button>
            <button onClick={() => setIsOpen(false)} className="btn-confirm">
              확인
            </button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  render: () => <BasicDialog />,
  parameters: {
    docs: {
      description: {
        story: '기본적인 Dialog 사용 예제입니다.',
      },
    },
  },
}

export const UnControlled: Story = {
  render: () => <UnControlledDialog />,
  parameters: {
    docs: {
      description: {
        story: '내부적으로 상태를 관리하는 비제어 다이얼로그 예제입니다.',
      },
    },
  },
}

//UnControlledDialog
const UnControlledDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>버튼</Button>
      </DialogTrigger>
      <DialogContent>Dialog Content</DialogContent>
    </Dialog>
  )
}

// 복잡한 내용이 있는 다이얼로그
const ComplexDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        복잡한 다이얼로그 열기
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>복잡한 다이얼로그</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <p>이 다이얼로그는 더 복잡한 내용을 포함하고 있습니다.</p>
                <ul className="list-disc pl-4">
                  <li>여러 줄의 텍스트</li>
                  <li>리스트 아이템</li>
                  <li>다양한 스타일링</li>
                </ul>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button onClick={() => setIsOpen(false)} className="btn-cancel">
              취소
            </button>
            <button onClick={() => setIsOpen(false)} className="btn-confirm">
              확인
            </button>
          </DialogFooter>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Complex: Story = {
  render: () => <ComplexDialog />,
}

// 커스텀 스타일이 적용된 다이얼로그
const CustomStyledDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        커스텀 스타일 다이얼로그 열기
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-blue-50 to-purple-50">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-600">
              커스텀 스타일 다이얼로그
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              이 다이얼로그는 커스텀 스타일이 적용되어 있습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-cancel bg-gray-100 hover:bg-gray-200"
            >
              취소
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-confirm bg-blue-600 hover:bg-blue-700 text-white"
            >
              확인
            </button>
          </DialogFooter>
          <DialogClose className="text-gray-400 hover:text-gray-600" />
        </DialogContent>
      </Dialog>
    </>
  )
}

export const CustomStyled: Story = {
  render: () => <CustomStyledDialog />,
}

export const CustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>커스텀 콘텐츠 다이얼로그</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>프로필 수정</DialogTitle>
            <DialogDescription>
              프로필 정보를 수정하세요. 변경사항은 저장 후 적용됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                이름
              </label>
              <input id="name" defaultValue="홍길동" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                사용자명
              </label>
              <input
                id="username"
                defaultValue="@hong"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 콘텐츠를 포함한 다이얼로그 예제입니다.',
      },
    },
  },
}
