# @hensley-ui/react-button

A flexible and accessible button component built with React and Radix UI.

## Installation

```bash
npm install @hensley-ui/react-button
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install clsx tailwind-merge
```

Or if you're using yarn:

```bash
yarn add clsx tailwind-merge
```

```bash
pnpm add clsx tailwind-merge
```

## Usage

```tsx
import { Button } from '@hensley-ui/react-button'

function App() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}
```

## API

### Button Props

| Prop      | Type                                                                        | Default   | Description             |
| --------- | --------------------------------------------------------------------------- | --------- | ----------------------- |
| variant   | 'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' | 'default' | Button style variant    |
| size      | 'default' \| 'sm' \| 'lg' \| 'icon'                                         | 'default' | Button size             |
| fullWidth | boolean                                                                     | false     | Use full width          |
| asChild   | boolean                                                                     | false     | Render as child element |

## Examples

### Basic Usage

```tsx
<Button>Default Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

### States

```tsx
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
<Button asChild>
  <a href="#">As Link</a>
</Button>
```

## Dependencies

This package includes:

- `@radix-ui/react-slot` - For asChild functionality
- `class-variance-authority` - For variant management

## Peer Dependencies

- `react` >= 18.0.0-rc < 20.0.0
- `@types/react` >= 18.0.0-rc < 20.0.0
- `clsx` ^2.1.1
- `tailwind-merge` ^2.6.0

## License

MIT
