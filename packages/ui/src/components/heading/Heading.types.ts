export type AsProp = {
  as?: HeadingTags
}

export type TextOwnProps = {
  className?: string
}

export type OmitPropsWithoutRef<C extends React.ElementType> = Omit<
  React.ComponentPropsWithoutRef<C>,
  keyof TextOwnProps | keyof AsProp
>

export type TextRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref']

export type TextProps<C extends React.ElementType> = OmitPropsWithoutRef<C> &
  TextOwnProps &
  AsProp

export type TextPropsWithRef<C extends React.ElementType> = TextProps<C> & {
  ref?: TextRef<C>
}

export type TextComponent = (<C extends React.ElementType = 'p'>(
  props: TextPropsWithRef<C>,
) => React.ReactElement | null) & {
  displayName?: string
}

type HeadingTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
