import * as React from 'react'
import { cn } from '../../lib/utils'
import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
  buttonVariants,
} from '../../base-ui/ui/button'
interface ButtonProps extends BaseButtonProps {
  fullWidth?: boolean
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth = false, ...props }, ref) => {
    // console.log('Button rendered'); // log 추가
    return (
      <BaseButton
        className={cn(className, fullWidth && 'w-full')}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
