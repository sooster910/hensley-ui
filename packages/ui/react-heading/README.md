# @hensley-ui/react-heading

A flexible and accessible heading component built with React and Tailwind CSS. This component provides semantic heading elements (h1-h6) with consistent styling and typography.

## Installation

```bash
npm install @hensley-ui/react-heading
```

**Note:** This package depends on `@hensley-ui/utils`. It will be installed automatically.

## Usage

```tsx
import { Heading } from '@hensley-ui/react-heading'

function App() {
  return (
    <div>
      <Heading as="h1">Main Title</Heading>
      <Heading as="h2">Section Title</Heading>
      <Heading as="h3">Subsection Title</Heading>
      <Heading as="h4">Smaller Title</Heading>
      <Heading as="h5">Even Smaller Title</Heading>
      <Heading as="h6">Smallest Title</Heading>
      <Heading as="p">Paragraph text with heading styles</Heading>
    </div>
  )
}
```

## Props

The Heading component accepts all standard HTML heading props plus:

- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' - The HTML element to render
- `className`: string - Additional CSS classes
- `children`: ReactNode - The content to display

### Default Styles

Each heading level comes with predefined Tailwind CSS classes:

- **h1**: `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`
- **h2**: `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`
- **h3**: `scroll-m-20 text-2xl font-semibold tracking-tight`
- **h4**: `scroll-m-20 text-xl font-semibold tracking-tight`
- **h5**: `scroll-m-20 text-lg font-semibold tracking-tight`
- **h6**: `scroll-m-20 text-base font-semibold tracking-tight`
- **p**: `leading-7 [&:not(:first-child)]:mt-6`

## Examples

### Basic Usage

```tsx
import { Heading } from '@hensley-ui/react-heading'

function Article() {
  return (
    <article>
      <Heading as="h1">Article Title</Heading>
      <Heading as="h2">Introduction</Heading>
      <p>Some introductory text...</p>
      <Heading as="h2">Main Content</Heading>
      <Heading as="h3">Subsection</Heading>
      <p>More content...</p>
    </article>
  )
}
```

### Custom Styling

```tsx
import { Heading } from '@hensley-ui/react-heading'

function CustomHeading() {
  return (
    <Heading
      as="h1"
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      Custom Styled Heading
    </Heading>
  )
}
```

### Polymorphic Component

The Heading component is polymorphic, meaning you can render it as any heading element:

```tsx
import { Heading } from '@hensley-ui/react-heading'

function DynamicHeading({ level, children }) {
  return (
    <Heading as={`h${level}`}>
      {children}
    </Heading>
  )
}

// Usage
<DynamicHeading level={1}>Level 1</DynamicHeading>
<DynamicHeading level={2}>Level 2</DynamicHeading>
```

## Dependencies

This package includes:

- `@hensley-ui/utils` - For class name utilities (cn function)
- `class-variance-authority` - For variant management

## Peer Dependencies

- `react` >= 18.0.0-rc < 20.0.0
- `@types/react` >= 18.0.0-rc < 20.0.0

## Accessibility

The Heading component follows accessibility best practices:

- Uses semantic HTML elements (h1-h6)
- Maintains proper heading hierarchy

## License

MIT
