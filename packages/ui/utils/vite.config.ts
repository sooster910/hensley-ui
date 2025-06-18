import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['clsx', 'tailwind-merge'],
      output: {
        exports: 'named',
      },
    },
  },
  plugins: [
    // dts({
    //   // include: ['src/**/*.ts'],
    //   include: ['src'], // ✅ glob 대신 폴더
    //   exclude: ['**/node_modules/**', '**/dist/**', '../**/*'], // 다른 패키지 제외
    //   insertTypesEntry: true,
    // }),
    dts(),
  ],
})
