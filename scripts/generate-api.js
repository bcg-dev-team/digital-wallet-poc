#!/usr/bin/env node

/**
 * OpenAPI Generator를 사용하여 API 클라이언트 코드를 생성하는 스크립트
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// 설정
const config = {
  swaggerJsonPath: join(projectRoot, 'swagger.json'),
  transformedSwaggerPath: join(projectRoot, 'swagger.transformed.json'),
  configPath: join(projectRoot, 'openapi-generator-config.yaml'),
  outputDir: join(projectRoot, 'packages/api/src/__generated__'),
  generatorName: 'typescript-axios'
};

/**
 * 디렉토리 초기화 (기존 내용 삭제 후 재생성)
 */
function cleanAndCreateDirectory(dirPath) {
  if (existsSync(dirPath)) {
    console.log(`🗑️  기존 디렉토리 삭제: ${dirPath}`);
    execSync(`rm -rf "${dirPath}"`, { cwd: projectRoot });
  }
  mkdirSync(dirPath, { recursive: true });
  console.log(`✅ 디렉토리 생성: ${dirPath}`);
}

/**
 * Swagger JSON 파일 존재 여부 확인
 */
function checkSwaggerJson() {
  if (!existsSync(config.swaggerJsonPath)) {
    console.error(`❌ Swagger JSON 파일을 찾을 수 없습니다: ${config.swaggerJsonPath}`);
    console.log('💡 Swagger JSON 파일을 프로젝트 루트에 배치해주세요.');
    process.exit(1);
  }
  console.log(`✅ Swagger JSON 파일 확인: ${config.swaggerJsonPath}`);
}

/**
 * StockCode 객체를 string으로 변환
 * @JsonCreator(mode = Mode.DELEGATING) 어노테이션이 있는 경우,
 * {"value": "USDAUD"} 형태가 아닌 "USDAUD" 형태로 전송해야 함
 */
function transformSwaggerJson() {
  try {
    console.log('🔄 Swagger JSON 변환 중...');
    
    // Swagger JSON 읽기
    const swaggerContent = readFileSync(config.swaggerJsonPath, 'utf-8');
    const swagger = JSON.parse(swaggerContent);
    
    // StockCode 참조를 string으로 변환
    function replaceStockCodeRefs(obj) {
      if (typeof obj !== 'object' || obj === null) return;
      
      for (const key in obj) {
        const value = obj[key];
        
        // $ref가 StockCode를 참조하는 경우
        if (key === '$ref' && value === '#/components/schemas/StockCode') {
          // 부모 객체를 string 타입으로 교체
          const parent = obj;
          delete parent.$ref;
          parent.type = 'string';
          parent.pattern = '^[A-Z0-9]+$';
          parent.maxLength = 50;
          parent.minLength = 1;
          console.log('  ✅ StockCode 참조를 string으로 변환');
        } else if (typeof value === 'object') {
          replaceStockCodeRefs(value);
        }
      }
    }
    
    // 변환 수행
    replaceStockCodeRefs(swagger);
    
    // 변환된 파일 저장
    writeFileSync(
      config.transformedSwaggerPath, 
      JSON.stringify(swagger, null, 2),
      'utf-8'
    );
    
    console.log(`✅ 변환된 Swagger JSON 저장: ${config.transformedSwaggerPath}`);
    
  } catch (error) {
    console.error('❌ Swagger JSON 변환 중 오류 발생:', error.message);
    process.exit(1);
  }
}

/**
 * OpenAPI Generator 실행
 */
function generateApiClient() {
  try {
    console.log('🚀 OpenAPI Generator 실행 중...');
    
    // 변환된 Swagger JSON 사용
    const command = [
      'pnpm exec openapi-generator-cli generate',
      `-g ${config.generatorName}`,
      `-i ${config.transformedSwaggerPath}`,
      `-o ${config.outputDir}`,
      `-c ${config.configPath}`
    ].join(' ');

    console.log(`실행 명령어: ${command}`);
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ API 클라이언트 코드 생성 완료!');
    
  } catch (error) {
    console.error('❌ API 클라이언트 생성 중 오류 발생:', error.message);
    process.exit(1);
  }
}

/**
 * 생성된 파일들 정리
 */
function cleanupGeneratedFiles() {
  try {
    console.log('🧹 생성된 파일들 정리 중...');
    
    // 불필요한 파일들 제거
    const filesToRemove = [
      'README.md',
      '.openapi-generator-ignore',
      '.openapi-generator',
      'git_push.sh'
    ];
    
    filesToRemove.forEach(file => {
      const filePath = join(config.outputDir, file);
      if (existsSync(filePath)) {
        execSync(`rm -rf "${filePath}"`, { cwd: projectRoot });
        console.log(`🗑️  제거: ${file}`);
      }
    });
    
    // 변환된 Swagger JSON 파일도 제거
    if (existsSync(config.transformedSwaggerPath)) {
      execSync(`rm -f "${config.transformedSwaggerPath}"`, { cwd: projectRoot });
      console.log('🗑️  제거: swagger.transformed.json');
    }
    
    console.log('✅ 파일 정리 완료!');
    
  } catch (error) {
    console.warn('⚠️  파일 정리 중 오류 발생:', error.message);
  }
}

/**
 * 타입 파일 통합
 */
function consolidateTypes() {
  try {
    console.log('🔄 타입 파일 통합 중...');
    
    const command = 'tsx scripts/consolidate-generated-types.ts';
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ 타입 파일 통합 완료!');
    
  } catch (error) {
    console.warn('⚠️  타입 파일 통합 중 오류 발생:', error.message);
  }
}

/**
 * 생성된 파일들 Prettier 포매팅
 */
function formatGeneratedFiles() {
  try {
    console.log('✨ 생성된 파일 포매팅 중...');
    
    const command = `prettier --write "${config.outputDir}/**/*.{ts,js}"`;
    
    execSync(command, { 
      stdio: 'inherit',
      cwd: projectRoot
    });
    
    console.log('✅ 파일 포매팅 완료!');
    
  } catch (error) {
    console.warn('⚠️  파일 포매팅 중 오류 발생:', error.message);
  }
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🎯 OpenAPI Generator 실행 시작');
  console.log('================================');
  
  // 1. 출력 디렉토리 초기화 (깨끗한 상태에서 시작)
  cleanAndCreateDirectory(config.outputDir);
  
  // 2. Swagger JSON 파일 확인
  checkSwaggerJson();
  
  // 3. Swagger JSON 변환 (StockCode 객체 → string)
  transformSwaggerJson();
  
  // 4. API 클라이언트 생성
  generateApiClient();
  
  // 5. 생성된 파일들 정리
  cleanupGeneratedFiles();
  
  // 6. 타입 파일 통합
  consolidateTypes();
  
  // 7. 생성된 파일들 포매팅
  formatGeneratedFiles();
  
  console.log('================================');
  console.log('🎉 OpenAPI Generator 실행 완료!');
  console.log(`📁 생성된 파일 위치: ${config.outputDir}`);
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main as generateApiClient };
