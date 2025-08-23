import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HensleyUI-React-SimpleDialog',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'clsx',
        'tailwind-merge',
        'lucide-react',
        '@hensley-ui/react-button',
        '@radix-ui/react-dialog',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact',
          '@hensley-ui/react-button': 'HensleyUIReactButton',
          '@radix-ui/react-dialog': 'RadixUIReactDialog',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      exclude: [
        '**/*.test.*',
        '**/*.stories.*',
        '**/*.spec.*',
        '**/vitest.config.*',
      ],
    }),
  ],
})