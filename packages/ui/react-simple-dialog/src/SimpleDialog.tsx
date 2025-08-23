import { isValidElement, PropsWithChildren, useState } from 'react'
import { Button } from '@hensley-ui/react-button'

import { SimpleDialogContext } from './context'
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../../base-ui/ui/dialog'
import { SimpleDialogType } from './SimpleDialog.types'

export const SimpleDialogProvider = ({
  children,
}: PropsWithChildren & { defaultDialogContent?: SimpleDialogType }) => {
  const [dialogContent, setModalContent] = useState<null | SimpleDialogType>(
    null,
  )
  const openDialog = (props: SimpleDialogType) => {
    setModalContent(props)
  }
  const closeDialog = () => setModalContent(null)
  return (
    <SimpleDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={!!dialogContent} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogContent?.title}</DialogTitle>
            <DialogDescription>{dialogContent?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => dialogContent?.onConfirm?.()}
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
  )
}