import { useContext } from 'react'
import { SimpleDialogContext } from './context'
import { SimpleDialogType } from './SimpleDialog.types'

export const useSimpleDialogContext = () => {
  const context = useContext(SimpleDialogContext)
  if (!context) {
    throw new Error(
      'useSimpleDialogContext must be used within a SimpleDialogProvider',
    )
  }

  return context
}

export const useSimpleDialog = () => {
  const { openDialog, closeDialog } = useSimpleDialogContext()

  return (props: SimpleDialogType) => {
    return new Promise<boolean>((resolve) => {
      const content = {
        ...props,
        onConfirm: () => {
          resolve(true)
          closeDialog()
        },
        onCancel: () => {
          resolve(false)
          closeDialog()
        },
      }
      openDialog(content)
    })
  }
}