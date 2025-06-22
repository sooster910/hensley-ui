import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'
// https://vite.dev/config/
export default defineConfig({
  logLevel: 'info', // 'info', 'warn', 'error', 'silent'
  plugins: [
    react(), // React JSX를 JavaScript로 변환
    dts({
      insertTypesEntry: true,
      logLevel: 'info', // 로깅 활성화
      tsconfigPath: './tsconfig.json', // tsconfig.json 파일 경로
    }),
  ],

  resolve: {
    alias: {
      '@/lib': path.resolve(__dirname, './lib'),
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'base-ui/ui/button.tsx'),
      name: 'hensley-ui',
      formats: ['es'],

      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-slot',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        'class-variance-authority',
        'clsx',
        'lucide-react',
        'motion',
        'overlay-kit',
        'tailwind-merge',
        'tailwindcss-animate',
      ],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
