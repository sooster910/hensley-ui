# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a monorepo using **pnpm workspaces** and **Turbo** for task orchestration.

### Common Commands
- `pnpm dev` - Start development mode for all packages in parallel
- `pnpm build` - Build all packages (excludes playground)
- `pnpm test` - Run tests for all packages (excludes playground)  
- `pnpm type-check` - Type check all packages (excludes playground)
- `pnpm clean` - Clean build artifacts across all packages

### Package-specific Commands
- `pnpm --filter @hensley-ui/ui storybook` - Run Storybook for the main UI package
- `pnpm build-storybook` - Build Storybook static files

### Publishing
- `pnpm version-packages` - Version packages using Changesets
- `pnpm ci:publish` - Publish packages to npm (used in CI)

## Architecture Overview

This is a **React UI component library** built on top of **Radix UI** and **ShadCN design system**. The project uses a monorepo structure with the following key packages:

### Workspace Structure
- `packages/ui/` - Main UI library package (`@hensley-ui/ui`)
  - Contains polymorphic components (Heading, Button, Dialog, etc.)
  - Uses Radix UI primitives with ShadCN styling
  - Built with Vite and bundled as ES modules
  - Includes Storybook for component documentation
  
- `packages/ui/react-button/` - Standalone button package (`@hensley-ui/react-button`)
- `packages/ui/react-heading/` - Standalone heading package  
- `packages/typescript-config/` - Shared TypeScript configurations
- `playground/` - Development playground using Vite + React

### Key Technologies
- **Build System**: Vite with TypeScript and DTS generation
- **Styling**: TailwindCSS with ShadCN design tokens
- **Component Architecture**: Polymorphic components using Radix Slot
- **Testing**: Vitest with React Testing Library
- **Documentation**: Storybook
- **Monorepo**: pnpm workspaces + Turbo

### Component Philosophy
Components follow a **polymorphic pattern** allowing them to render as different HTML elements via the `as` prop. All components are built with accessibility-first approach using Radix UI primitives.

Example:
```tsx
<Heading as="h1">Main Title</Heading>
<Heading as="p">Paragraph text</Heading>
```

### Build Process
The main UI package builds with Vite, generating:
- ES modules in `dist/index.es.js`
- TypeScript declarations in `dist/index.d.ts` 
- CSS bundle in `dist/styles.css`

Individual component packages are built separately and can be consumed independently.

## Testing Strategy

- Unit tests use Vitest + React Testing Library + jsdom
- Run `pnpm test` to execute all tests
- Individual packages can run tests with `pnpm --filter <package> test`

## Linting and Type Checking

- ESLint configuration extends from the monorepo root
- TypeScript configs extend from `@hensley-ui/typescript-config`
- Run `pnpm type-check` before building to catch type errors
- Turbo ensures type-checking happens before builds automatically