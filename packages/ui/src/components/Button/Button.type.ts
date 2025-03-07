import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/button/Button'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  animated?: boolean
}
