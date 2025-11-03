import kebabCase from 'kebab-case';
import { optimize } from 'svgo';
import path from 'path';
import fs from 'fs';

// 루트에서 실행되므로 packages/ui 기준으로 경로 설정
const ICONS_DIR = path.resolve(process.cwd(), 'packages/ui/src/assets/icons');
const FLAGS_DIR = path.resolve(ICONS_DIR, 'flags');
const TRADE_DIR = path.resolve(ICONS_DIR, 'trade');

// 일반 아이콘용 SVGO 설정 (fill, stroke를 currentColor로 변환)
const regularSvgConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUselessStrokeAndFill: false, // stroke/fill 유지
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['width', 'height'], // width, height만 제거
      },
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true, // 색상을 currentColor로 변환
      },
    },
  ],
};

// 플래그 아이콘용 SVGO 설정 (fill, stroke 유지)
const flagSvgConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUselessStrokeAndFill: false, // 플래그는 색상 유지
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['width', 'height'], // fill, stroke는 제거하지 않음
      },
    },
  ],
};

// 중복 파일 처리 함수
function handleDuplicateFile(originalPath: string, newPath: string): boolean {
  try {
    // 같은 경로인 경우 (대소문자만 다른 경우)
    if (originalPath.toLowerCase() === newPath.toLowerCase()) {
      // 임시 파일명으로 먼저 이동
      const tempPath = newPath + '.temp';
      fs.renameSync(originalPath, tempPath);

      // 기존 파일이 있다면 삭제
      if (fs.existsSync(newPath)) {
        fs.unlinkSync(newPath);
      }

      // 임시 파일을 최종 경로로 이동
      fs.renameSync(tempPath, newPath);
      return true;
    }

    // 다른 경로인 경우
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }

    fs.renameSync(originalPath, newPath);
    return true;
  } catch (error) {
    console.error(`❌ Error handling duplicate file:`, error);
    return false;
  }
}

// SVG 최적화 함수
function cleanSVGs(dir: string) {
  const files = fs.readdirSync(dir);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  let renamedCount = 0;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // 디렉토리 처리
    if (stat.isDirectory()) {
      const subResult = cleanSVGs(fullPath);
      totalOriginalSize += subResult.originalSize;
      totalOptimizedSize += subResult.optimizedSize;
      processedCount += subResult.processedCount;
      renamedCount += subResult.renamedCount;
      continue;
    }

    // .svg 파일만 처리
    if (path.extname(file) === '.svg') {
      const originalContent = fs.readFileSync(fullPath, 'utf8');
      const originalSize = Buffer.byteLength(originalContent, 'utf8');

      // 파일 경로에 따라 적절한 SVGO 설정 선택
      const isFlagIcon = fullPath.startsWith(FLAGS_DIR);
      const isTradeIcon = fullPath.startsWith(TRADE_DIR);
      const shouldKeepColors = isFlagIcon || isTradeIcon;

      const result = optimize(originalContent, {
        path: fullPath,
        ...(shouldKeepColors ? flagSvgConfig : regularSvgConfig),
      } as any);

      if ('error' in result) {
        console.error(`❌ Error optimizing ${file}:`, result.error);
        continue;
      }

      const optimizedSize = Buffer.byteLength(result.data, 'utf8');
      const saved = originalSize - optimizedSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(2);

      // 파일명을 kebab-case로 변환
      const fileNameWithoutExt = path.basename(file, '.svg');

      // 전처리: 연속된 대문자들 중 맨 앞 글자를 제외하고 나머지를 소문자로 변경
      let preprocessedName = fileNameWithoutExt.replace(
        /([A-Z])([A-Z]+)/g,
        (match, first, rest) => {
          return first + rest.toLowerCase();
        }
      );

      // 대괄호 부분 제거 [부터 ]까지
      preprocessedName = preprocessedName.replace(/\[.*?\]/g, '');

      // 언더스코어 제거
      preprocessedName = preprocessedName.replace(/_/g, '');

      // kebab-case 변환
      let kebabCaseName = kebabCase(preprocessedName, false);

      // 후처리: 특이 케이스들 처리
      // flag--XX 형태는 flag-xx로 변환 (XX는 2글자 국가 코드)
      if (kebabCaseName.match(/^flag--[a-z]-[a-z]$/)) {
        const parts = kebabCaseName.split('--');
        if (parts.length === 2) {
          const countryCode = parts[1].replace(/-/g, '');
          kebabCaseName = `flag-${countryCode}`;
        }
      }

      // flag--s-u-i 특별 처리
      if (kebabCaseName === 'flag--s-u-i') {
        kebabCaseName = 'flag-sui';
      }

      // noti를 notification으로 특별 처리
      if (kebabCaseName === 'noti') {
        kebabCaseName = 'notification';
      }

      // 연속된 하이픈을 하나로 변환
      kebabCaseName = kebabCaseName.replace(/-+/g, '-');

      // 앞뒤 하이픈 제거
      kebabCaseName = kebabCaseName.replace(/^-+|-+$/g, '');

      const newFileName = `${kebabCaseName}.svg`;
      const newFilePath = path.join(path.dirname(fullPath), newFileName);

      // 파일명이 변경된 경우에만 리네임
      if (file !== newFileName) {
        // 최적화된 데이터를 먼저 저장
        fs.writeFileSync(fullPath, result.data, 'utf8');

        // 파일명 변경 처리
        if (handleDuplicateFile(fullPath, newFilePath)) {
          console.log(`🔄 Renamed: ${file} → ${newFileName}`);
          renamedCount++;
        } else {
          console.error(`❌ Failed to rename ${file} to ${newFileName}`);
        }
      } else {
        // 파일명이 이미 kebab-case인 경우
        fs.writeFileSync(fullPath, result.data, 'utf8');
      }

      totalOriginalSize += originalSize;
      totalOptimizedSize += optimizedSize;
      processedCount++;

      console.log(
        `✔ Cleaned: ${path.relative(ICONS_DIR, newFilePath)} (${originalSize} → ${optimizedSize} bytes, ${savedPercent}% 절약)`
      );
    }
  }

  return {
    originalSize: totalOriginalSize,
    optimizedSize: totalOptimizedSize,
    processedCount,
    renamedCount,
  };
}

// 실행
console.log('🚀 아이콘 최적화 시작...\n');
const result = cleanSVGs(ICONS_DIR);

console.log('\n📈 최적화 결과 요약:');
console.log(`✅ 처리된 파일: ${result.processedCount}개`);
console.log(`🔄 리네임된 파일: ${result.renamedCount}개`);
console.log(`📊 총 크기: ${result.originalSize} → ${result.optimizedSize} bytes`);

const totalSaved = result.originalSize - result.optimizedSize;
const totalSavedPercent = ((totalSaved / result.originalSize) * 100).toFixed(2);

console.log(`💾 절약: ${totalSaved} bytes (${totalSavedPercent}%)`);
console.log('\n🎉 아이콘 최적화 완료!');
