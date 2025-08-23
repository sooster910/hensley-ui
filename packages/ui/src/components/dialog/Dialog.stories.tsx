import { Meta, StoryObj } from '@storybook/react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../base-ui/ui/dialog'
import { Button } from '@hensley-ui/react-button'

const meta: Meta<typeof Dialog> = {
  title: 'UI Component/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dialog는 모달 형태의 대화상자를 표시하는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// 기본 다이얼로그
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            이것은 기본 다이얼로그의 설명입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">다이얼로그의 본문 내용이 여기에 들어갑니다.</div>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// 경고 다이얼로그
export const Alert: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">삭제하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">취소</Button>
          <Button variant="destructive">삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// 긴 내용의 다이얼로그
export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">자세히 보기</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>상세 정보</DialogTitle>
          <DialogDescription>아래는 상세한 내용입니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="p-4 border rounded">
              섹션 {i + 1}의 내용입니다.
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline">닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// 커스텀 스타일 다이얼로그
export const CustomStyle: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">커스텀 스타일</Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
        <DialogHeader>
          <DialogTitle className="text-purple-800">
            커스텀 스타일 다이얼로그
          </DialogTitle>
          <DialogDescription className="text-purple-600">
            배경과 테두리가 커스텀된 다이얼로그입니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          커스텀 스타일이 적용된 다이얼로그의 내용입니다.
        </div>
        <DialogFooter>
          <Button variant="outline" className="border-purple-300">
            취소
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
