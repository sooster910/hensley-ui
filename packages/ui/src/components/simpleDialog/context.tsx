import { createContext } from 'react'
import { SimpleDialogType } from './SimpleDialog.types'

export type SimpleDialogContextType = {
  openDialog: (props: SimpleDialogType) => void
  closeDialog: () => void
}

export const SimpleDialogContext =
  createContext<SimpleDialogContextType | null>(null)
