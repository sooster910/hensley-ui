import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { SimpleDialogProvider } from './SimpleDialog'
import { useSimpleDialog } from './useSimpleDialog'
import { Button } from '@hensley-ui/react-button'
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

  it('confirm을 누르면, Promise가 true로 resolve되어야 함', async () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(
      <SimpleDialogProvider>
        <DialogOpener
          confirmButton="확인"
          cancelButton="취소"
          description="정말 삭제하시겠습니까?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </SimpleDialogProvider>,
    )

    await userEvent.click(screen.getByText('Open Dialog'))
    await screen.findByText('정말 삭제하시겠습니까?')

    await userEvent.click(screen.getByText('확인'))
    expect(onConfirm).toHaveBeenCalled()
  })

  it('cancel을 누르면, Promise가 false로 resolve되어야 함', async () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(
      <SimpleDialogProvider>
        <DialogOpener
          confirmButton="확인"
          cancelButton="취소"
          description="정말 삭제하시겠습니까?"
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </SimpleDialogProvider>,
    )

    await userEvent.click(screen.getByText('Open Dialog'))
    await screen.findByText('정말 삭제하시겠습니까?')

    await userEvent.click(screen.getByText('취소'))
    expect(onCancel).toHaveBeenCalled()
  })
})

const DialogOpener = ({
  confirmButton,
  cancelButton,
  title,
  description,
  onConfirm,
  onCancel,
}: Partial<SimpleDialogType>) => {
  const openModal = useSimpleDialog()

  const open = async () => {
    const confirmed = await openModal({
      title,
      description,
      cancelButton,
      confirmButton,
      onConfirm,
      onCancel,
    })

    if (confirmed) {
      onConfirm?.()
    } else {
      onCancel?.()
    }
  }

  return <Button onClick={open}>Open Dialog</Button>
}