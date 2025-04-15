import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { SimpleDialogProvider } from './SimpleDialog'
import { useSimpleDialog } from './useSimpleDialog'
import { Button } from '@components/button'
import { SimpleDialogType } from './SimpleDialog.types'

describe('SimpleDialogProvider', () => {
  it('확인, 취소 버튼이 텍스트인경우, 버튼에 텍스트가 나와야 한다.', async () => {
    render(
      <SimpleDialogProvider>
        <DialogOpener confirmButton="확인" cancelButton="취소" />
      </SimpleDialogProvider>,
    )
    const button = screen.getByText(/Open Dialog/i)
    await userEvent.click(button)

    const confirmButton = screen.getByRole('button', { name: '확인' })
    expect(confirmButton).toBeInTheDocument()

    const cancelButton = screen.getByRole('button', { name: '취소' })
    expect(cancelButton).toBeInTheDocument()
  })

  it('확인이나 취소버튼이 element인 경우, 버튼이 element로 대체되어야 한다.', async () => {
    render(
      <SimpleDialogProvider>
        <DialogOpener
          title="테스트"
          description="Test Description"
          confirmButton={<span data-testid="custom-confirm">커스텀 확인</span>}
          cancelButton={<span data-testid="custom-cancel">커스텀 취소</span>}
        />
      </SimpleDialogProvider>,
    )

    await userEvent.click(screen.getByText('Open Dialog'))

    expect(screen.getByText('테스트')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByTestId('custom-confirm')).toBeInTheDocument()
    expect(screen.getByTestId('custom-cancel')).toBeInTheDocument()
  })

  it('onConfirm , onCancel 콜백은 버튼을 클릭했을 때 올바르게 함수호출이 되어야 한다', async () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(
      <SimpleDialogProvider>
        <DialogOpener
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmButton="확인"
          cancelButton="취소"
        />
      </SimpleDialogProvider>,
    )

    await userEvent.click(screen.getByText('Open Dialog'))

    await userEvent.click(screen.getByText('확인'))
    expect(onConfirm).toHaveBeenCalled()

    await userEvent.click(screen.getByText('취소'))
    expect(onCancel).toHaveBeenCalled()
  })
})

const DialogOpener = ({
  confirmButton,
  cancelButton,
  title,
  description,
  onCancel,
  onConfirm,
}: Partial<SimpleDialogType>) => {
  const { confirm } = useSimpleDialog()

  const open = () => {
    confirm({
      title,
      description,
      cancelButton,
      confirmButton,
      onCancel: onCancel || (() => alert('취소됨')),
      onConfirm: onConfirm || (() => alert('확인됨')),
    })
  }

  return <Button onClick={open}>Open Dialog</Button>
}
