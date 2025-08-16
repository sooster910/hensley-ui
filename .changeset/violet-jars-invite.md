---
"@hensley-ui/react-heading": patch
---

fix: resolve Module not found error for react-heading package

- Users encountered "Module not found: Error: Can't resolve 'react-heading'"
- Package name mismatch between documentation and actual package name
- Missing build files in dist directory
- Inconsistent module format (mixed ESM/CommonJS)

- Fix package name: use @hensley-ui/react-heading instead of react-heading
- Convert to ESM-only build (remove CommonJS support)
- Update package.json exports configuration
- Regenerate build files with proper ESM format
- Update README.md with correct usage examples
- Fix vite.config.ts for ESM-only output

- Package now exports only ESM format (removed CommonJS support)
- Users must use @hensley-ui/react-heading instead of react-heading

- Install: npm install @hensley-ui/react-heading
- Import: import { Heading } from '@hensley-ui/react-heading'

- Resolves GitHub issue #34
