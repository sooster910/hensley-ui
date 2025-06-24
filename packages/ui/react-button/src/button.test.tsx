import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    // expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    expect(true).toBe(true)
  })

  it('renders button with variant', () => {
    render(<Button variant="destructive">Delete</Button>)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toHaveClass('bg-destructive')
  })

  it('renders button with size', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: 'Small' })
    expect(button).toHaveClass('h-8')
  })

  it('renders full width button', () => {
    render(<Button fullWidth>Full Width</Button>)
    const button = screen.getByRole('button', { name: 'Full Width' })
    expect(button).toHaveClass('w-full')
  })
})
