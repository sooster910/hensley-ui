import { createContext } from 'react'
import { SimpleDialogType } from './SimpleDialog.types'

export type SimpleDialogContextType = {
  confirm: (contents: SimpleDialogType) => void
}

export const SimpleDialogContext =
  createContext<SimpleDialogContextType | null>(null)
