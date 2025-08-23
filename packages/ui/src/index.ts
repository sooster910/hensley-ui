import { Button, ButtonProps } from '@/components/button'
import { Heading } from '@/components/heading/Heading'
import {
  AsProp,
  OmitPropsWithoutRef,
  TextOwnProps,
  TextPropsWithRef,
  TextProps,
  TextRef,
} from '@/components/heading/Heading.types'

// SimpleDialog를 새로운 패키지에서 re-export
export {
  SimpleDialogProvider,
  useSimpleDialog,
  type SimpleDialogType,
} from '@hensley-ui/react-simple-dialog'

export { Button, Heading }
export type {
  ButtonProps,
  AsProp,
  OmitPropsWithoutRef,
  TextOwnProps,
  TextPropsWithRef,
  TextProps,
  TextRef,
}
