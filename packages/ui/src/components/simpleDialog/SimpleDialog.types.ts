import { ReactNode } from 'react'

export type SimpleDialogType = {
  title: string | ReactNode
  description: string | ReactNode
  cancelButton: string | ReactNode
  confirmButton: string | ReactNode
  onConfirm: () => void
  onCancel: () => void
}
