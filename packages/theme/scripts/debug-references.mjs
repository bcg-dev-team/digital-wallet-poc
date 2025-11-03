import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// __tokens.json 파일 읽기
const tokensPath = path.join(__dirname, '../src/tokens/__tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// 참조 변환 함수
function fixThemeReferences(obj, theme) {
  if (typeof obj !== 'object' || obj === null) return;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      if (value.$value && typeof value.$value === 'string' && value.$value.startsWith('{')) {
        // 변환 전 로그
        if (value.$value.includes('{Base-Colors')) {
          console.log(`Before: ${value.$value}`);
        }

        // {Base-Colors...} → {Theme/Light.Base-Colors...} 또는 {Theme/Dark.Base-Colors...}
        value.$value = value.$value
          .replace(/\{Base-Colors/g, `{Theme/${theme}.Base-Colors`)
          .replace(/\{Base-Size/g, `{Theme/${theme}.Base-Size`)
          .replace(/\{Base-Typography/g, `{Theme/${theme}.Base-Typography`)
          .replace(/\{Base-Radius/g, `{Theme/${theme}.Base-Radius`)
          .replace(/\{Font/g, `{Theme/${theme}.Font`)
          .replace(/\{Background/g, `{Theme/${theme}.Background}`);

        // 변환 후 로그
        if (value.$value.includes('{Theme/')) {
          console.log(`After: ${value.$value}`);
        }
      } else {
        fixThemeReferences(value, theme);
      }
    }
  }
}

// Dark 테마 토큰 복사 및 참조 변환
const tokensDark = JSON.parse(JSON.stringify(tokens));
console.log('🔍 Debugging Dark theme references...');
fixThemeReferences(tokensDark['Theme/Dark'], 'Dark');

// 몇 개 샘플 확인
console.log('\n📋 Sample references after conversion:');
const sampleRefs = [
  'Theme/Dark.Base-Colors.Common.bg-surface-default',
  'Theme/Dark.Button.Primary.background',
  'Theme/Dark.Font.Color.Primary',
];

sampleRefs.forEach((ref) => {
  const path = ref.split('.');
  let current = tokensDark;
  for (const key of path) {
    current = current[key];
  }
  if (current && current.$value) {
    console.log(`${ref}: ${current.$value}`);
  }
});
