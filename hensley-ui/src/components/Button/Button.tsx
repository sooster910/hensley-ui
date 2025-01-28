import { PropsWithChildren } from 'react'


export interface ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children }: ButtonProps&PropsWithChildren): JSX.Element => {
  return <button>{children}</button>
}

Button.displayName = "Button";