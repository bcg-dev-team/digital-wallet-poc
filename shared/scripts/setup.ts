#!/usr/bin/env node

/**
 * 프로젝트 설정 스크립트
 * 모노레포 초기 설정을 위한 유틸리티
 */

import { existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

/**
 * 디렉토리가 존재하지 않으면 생성
 */
function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

/**
 * 패키지 빌드
 */
function buildPackage(packageName: string): void {
  try {
    console.log(`🔨 Building ${packageName}...`);
    execSync(`pnpm --filter ${packageName} build`, { stdio: 'inherit' });
    console.log(`✅ Built ${packageName}`);
  } catch (error) {
    console.error(`❌ Failed to build ${packageName}:`, error);
  }
}

/**
 * 메인 설정 함수
 */
function setup(): void {
  console.log('🚀 Setting up Vue 3 Monorepo Template...');

  // 필수 디렉토리 생성
  const dirs = [
    'packages/types/dist',
    'packages/utils/dist',
    'packages/ui/dist',
    'packages/api/dist',
    'apps/desktop/dist',
    'apps/mobile/dist',
  ];

  dirs.forEach((dir) => ensureDir(dir));

  // 패키지 빌드 순서
  const buildOrder = ['@template/types', '@template/utils', '@template/ui', '@template/api'];

  buildOrder.forEach(buildPackage);

  console.log('🎉 Setup completed!');
}

// 스크립트 실행
if (require.main === module) {
  setup();
}

export { setup };
