import {
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from 'react'

import { Button } from '@components/button'

import { SimpleDialogContext } from './context'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@components/ui/dialog'
import { SimpleDialogType } from './SimpleDialog.types'

export const SimpleDialogProvider = ({
  children,
}: PropsWithChildren & { defaultDialogContent?: SimpleDialogType }) => {
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
              <DialogTitle>{dialogContent?.title}</DialogTitle>
              <DialogDescription>
                {dialogContent?.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={dialogContent?.onConfirm}
                variant={'default'}
                {...(isValidElement(dialogContent?.confirmButton)
                  ? { asChild: true }
                  : {})}
              >
                {dialogContent?.confirmButton}
              </Button>
              <Button
                onClick={dialogContent?.onCancel}
                variant={'secondary'}
                {...(isValidElement(dialogContent?.cancelButton)
                  ? { asChild: true }
                  : {})}
              >
                {dialogContent?.cancelButton}
              </Button>
            </DialogFooter>
            <DialogClose />
          </DialogContent>
        </Dialog>
      </SimpleDialogContext.Provider>
    </>
  )
}
