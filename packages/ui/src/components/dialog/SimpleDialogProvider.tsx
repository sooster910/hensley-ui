import { PropsWithChildren, ReactNode, useContext, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './Dialog'
import { Button } from '@components/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { SimpleDialogContext } from './simpleDialogContext'

export type SimpleDialogType = Partial<{
  title: string | ReactNode
  description: string | ReactNode
  cancelButton: string | ReactNode
  confirmButton: string | ReactNode
  onConfirm: () => void
  onCancel: () => void
}>

export const useSimpleDialog = () => {
  const context = useContext(SimpleDialogContext)
  if (!context) {
    throw new Error(
      'useSimpleDialog must be used within a SimpleDialogProvider',
    )
  }
  return context
}
export const SimpleDialogProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState<SimpleDialogType | null>(
    null,
  )

  const confirm = (dialogOption: SimpleDialogType) => {
    setDialogContent({ ...dialogOption })
    setOpen(true)
  }

  return (
    <>
      <SimpleDialogContext.Provider value={{ confirm }}>
        {children}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>기본 다이얼로그</DialogTitle>
              <DialogDescription>
                이것은 기본적인 다이얼로그 예시입니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {dialogContent?.cancelButton ?? (
                <Button onClick={dialogContent?.onCancel} variant={'ghost'}>
                  취소
                </Button>
              )}
              {dialogContent?.confirmButton ?? (
                <Button onClick={dialogContent?.onConfirm} variant={'default'}>
                  확인
                </Button>
              )}
            </DialogFooter>
            <DialogClose />
          </DialogContent>
        </Dialog>
      </SimpleDialogContext.Provider>
    </>
  )
}
