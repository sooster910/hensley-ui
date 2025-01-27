import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),// React JSX를 JavaScript로 변환
    dts({ insertTypesEntry: true }) // TypeScript 타입 정의 파일(.d.ts) 생성
  ],
  build:{
    lib:{
      entry: resolve(__dirname, 'src/index.ts'),
      name:"hensley-ui",
      formats:['es','cjs','umd'],
      fileName:(format) => `hensley-ui.${format}.js`,
    },
    rollupOptions:{
      external:["react","react-dom"],
      output:{
        globals:{ 
          react:"React",
          "react-dom":"ReactDOM" 
        }
      }
    }
  }
})
