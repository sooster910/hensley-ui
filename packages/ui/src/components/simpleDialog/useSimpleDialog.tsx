import { useContext } from 'react'
import { SimpleDialogContext } from './context'

export const useSimpleDialog = () => {
  const context = useContext(SimpleDialogContext)
  if (!context) {
    throw new Error(
      'useSimpleDialog must be used within a SimpleDialogProvider',
    )
  }
  return context
}
