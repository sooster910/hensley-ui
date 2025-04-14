import { Meta, StoryObj } from '@storybook/react'
import { useContext } from 'react'
import { Button } from '@components/button'
import { SimpleDialogProvider, useSimpleDialog } from './SimpleDialogProvider'
import { SimpleDialogContext } from './simpleDialogContext'

const meta: Meta = {
  title: 'Components/Dialog/SimpleDialog',
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj

const ExampleTrigger = () => {
  const dialog = useContext(SimpleDialogContext)

  if (!dialog) {
    throw new Error(
      'SimpleDialogContext를 사용하려면 SimpleDialogProvider로 감싸야 합니다.',
    )
  }

  const open = () => {
    dialog.confirm({
      title: '스토리북 테스트',
      description: 'cancelButton이 string일 때 테스트입니다.',
      cancelButton: '닫기',
      confirmButton: '확인',
      onCancel: () => alert('취소됨'),
      onConfirm: () => alert('확인됨'),
    })
  }

  return <Button onClick={open}>다이얼로그 열기</Button>
}

export const Default: Story = {
  render: () => (
    <SimpleDialogProvider>
      <ExampleTrigger />
    </SimpleDialogProvider>
  ),
}
