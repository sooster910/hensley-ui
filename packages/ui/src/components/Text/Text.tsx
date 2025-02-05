import React from 'react'

type Rainbow =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet'

export type AsProp<C extends React.ElementType> = {
  as?: C
}

export type TextOwnProps = {
  color?: Rainbow | 'black'
}

export type OmitPropsWithoutRef<C extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<C>,
  keyof TextOwnProps | 'as'
>
export type TextRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export type TextProps<C extends React.ElementType> = OmitPropsWithoutRef<C> &
  TextOwnProps &
  AsProp<C>

export type TextPropsWithRef<C extends React.ElementType> = TextProps<C> & {
  ref?: TextRef<C>
}
export type TextComponent = (<C extends React.ElementType = 'span'>(
  props: TextPropsWithRef<C>,
) => React.ReactElement | null) & {
  displayName?: string
}

// forwardRef를 위한 타입 정의
export const Text = React.forwardRef(
  <C extends React.ElementType>(
    { as, children, color, ...restProps }: TextPropsWithRef<C>,
    ref?: TextRef<C>,
  ) => {
    const Component = as ?? 'span'
    return (
      <Component {...restProps} style={{ color }} ref={ref}>
        {children}
      </Component>
    )
  },
) as TextComponent

Text.displayName = 'Text'
