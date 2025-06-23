import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HensleyUI-React-Button',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@hensley-ui/react-button': resolve(__dirname, './src/index.ts'),
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
