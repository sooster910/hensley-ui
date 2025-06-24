# @hensley-ui/react-button

A flexible and accessible button component built with React and Radix UI.

## Installation

```bash
npm install @hensley-ui/react-button
```

**Note:** This package depends on `@hensley-ui/utils`. It will be installed automatically.

## Usage

```tsx
import { Button } from '@hensley-ui/react-button'

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="lg">Large Button</Button>
    </div>
  )
}
```

## Props

The Button component accepts all standard button props plus:

- `variant`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `asChild`: boolean - renders as child component using Radix UI Slot

## Dependencies

This package includes:

- `@hensley-ui/utils` - For class name utilities (cn function)
- `@radix-ui/react-slot` - For asChild functionality
- `class-variance-authority` - For variant management

## Peer Dependencies

- `react` >= 18.2.0
- `react-dom` >= 18.2.0

## License

MIT
