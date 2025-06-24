import { cn } from '@/lib/utils'
import { forwardRef, ForwardedRef } from 'react'
import { TextPropsWithRef } from './Heading.types.js'

// shadcn 스타일 매핑
const headingVariants = {
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'scroll-m-20 text-md font-semibold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
}

// forwardRef를 위한 타입 정의
export const HeadingComponent = <C extends React.ElementType>(
  { as, className, children, ...restProps }: TextPropsWithRef<C>,
  ref?: ForwardedRef<C>,
) => {
  const Component = as ?? 'p'

  const variantStyles = headingVariants[Component]
  return (
    <Component
      ref={ref}
      className={cn(className, variantStyles)}
      {...restProps}
    >
      {children}
    </Component>
  )
}

const Heading = forwardRef(HeadingComponent)
Heading.displayName = 'Heading'

export { Heading, headingVariants }
