import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, MotionProps } from 'motion/react'
import { Slot } from '@radix-ui/react-slot'
import { ButtonProps } from '@/components/button/Button.type'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
// NOTE: YAGNI 적용
const MOTION_ANIMATION = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
} as const

const BUTTON_BEHAVIOR_MAP = {
  animated: motion.button,
  default: 'button',
} as const

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  (
    { className, variant, size, animated = false, asChild = false, ...props },
    ref,
  ) => {
    const ButtonBehavior = animated
      ? BUTTON_BEHAVIOR_MAP.animated
      : BUTTON_BEHAVIOR_MAP.default
    const Comp = asChild ? Slot : ButtonBehavior
    const motionProps = animated ? MOTION_ANIMATION : {}
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
