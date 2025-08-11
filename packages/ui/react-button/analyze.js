#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distPath = path.join(__dirname, 'dist')
const statsPath = path.join(distPath, 'stats.html')
const bundlePath = path.join(distPath, 'index.mjs')

console.log('📊 React Button 빌드 분석 결과:')
console.log('')

if (fs.existsSync(statsPath)) {
  console.log('✅ 분석 파일이 생성되었습니다:')
  console.log(`📁 파일 위치: ${statsPath}`)
  console.log(`🌐 브라우저에서 열기: file://${statsPath}`)
} else {
  console.log('❌ 분석 파일이 생성되지 않았습니다.')
}

if (fs.existsSync(bundlePath)) {
  const stats = fs.statSync(bundlePath)
  const sizeInKB = (stats.size / 1024).toFixed(2)
  console.log(`📈 번들 크기: ${sizeInKB} KB`)

  // Gzip 크기 계산
  const { execSync } = await import('child_process')
  try {
    const gzipSize = execSync(`gzip -c "${bundlePath}" | wc -c`, {
      encoding: 'utf8',
    })
    const gzipSizeInKB = (parseInt(gzipSize.trim()) / 1024).toFixed(2)
    console.log(`🗜️  Gzip 크기: ${gzipSizeInKB} KB`)
  } catch {
    console.log('⚠️  Gzip 크기 계산 실패')
  }
} else {
  console.log('❌ 번들 파일을 찾을 수 없습니다.')
}

console.log('')
console.log(
  '💡 팁: stats.html 파일을 브라우저에서 열어서 상세한 번들 분석을 확인하세요!',
)
