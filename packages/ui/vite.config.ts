import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
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
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hensley-ui/utils': path.resolve(__dirname, './utils/src/index.ts'),
      '@hensley-ui/react-button': path.resolve(
        __dirname,
        './react-button/src/index.ts',
      ),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'hensley-ui',
      formats: ['es'],

      fileName: (format) => `index.${format}.js`,
    },

    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
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
