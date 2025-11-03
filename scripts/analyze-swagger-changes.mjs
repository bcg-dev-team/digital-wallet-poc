#!/usr/bin/env node

/**
 * Swagger JSON 변경사항 분석 스크립트
 *
 * 사용법:
 * node scripts/analyze-swagger-changes.mjs <old-commit> <new-commit>
 *
 * 예시:
 * node scripts/analyze-swagger-changes.mjs HEAD~1 HEAD
 * node scripts/analyze-swagger-changes.mjs abc123 def456
 */

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Git에서 특정 커밋의 swagger.json 내용을 가져옵니다
 */
function getSwaggerFromCommit(commitHash) {
  try {
    const content = execSync(`git show ${commitHash}:swagger.json`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ 커밋 ${commitHash}에서 swagger.json을 찾을 수 없습니다:`, error.message);
    process.exit(1);
  }
}

/**
 * API 엔드포인트 정보를 추출합니다
 */
function extractApiEndpoints(swagger) {
  const endpoints = [];

  for (const [path, methods] of Object.entries(swagger.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (operation.operationId) {
        endpoints.push({
          path,
          method: method.toUpperCase(),
          operationId: operation.operationId,
          summary: operation.summary || '',
          description: operation.description || '',
          tags: operation.tags || [],
          parameters: operation.parameters || [],
          requestBody: operation.requestBody,
          responses: operation.responses,
        });
      }
    }
  }

  return endpoints;
}

/**
 * 태그 정보를 추출합니다
 */
function extractTags(swagger) {
  return swagger.tags || [];
}

/**
 * 스키마 정보를 추출합니다
 */
function extractSchemas(swagger) {
  return Object.keys(swagger.components?.schemas || {});
}

/**
 * 두 API 엔드포인트 목록을 비교합니다
 */
function compareEndpoints(oldEndpoints, newEndpoints) {
  const changes = {
    added: [],
    removed: [],
    modified: [],
    unchanged: [],
  };

  const oldMap = new Map(oldEndpoints.map((api) => [api.operationId, api]));
  const newMap = new Map(newEndpoints.map((api) => [api.operationId, api]));

  // 추가된 API
  for (const [operationId, api] of newMap) {
    if (!oldMap.has(operationId)) {
      changes.added.push(api);
    }
  }

  // 제거된 API
  for (const [operationId, api] of oldMap) {
    if (!newMap.has(operationId)) {
      changes.removed.push(api);
    }
  }

  // 변경된 API
  for (const [operationId, newApi] of newMap) {
    if (oldMap.has(operationId)) {
      const oldApi = oldMap.get(operationId);
      const modifications = compareApiDetails(oldApi, newApi);
      if (modifications.length > 0) {
        changes.modified.push({
          operationId,
          old: oldApi,
          new: newApi,
          changes: modifications,
        });
      } else {
        changes.unchanged.push(newApi);
      }
    }
  }

  return changes;
}

/**
 * API 세부사항을 비교합니다
 */
function compareApiDetails(oldApi, newApi) {
  const changes = [];

  if (oldApi.path !== newApi.path) {
    changes.push({
      type: 'path',
      old: oldApi.path,
      new: newApi.path,
    });
  }

  if (oldApi.method !== newApi.method) {
    changes.push({
      type: 'method',
      old: oldApi.method,
      new: newApi.method,
    });
  }

  if (oldApi.summary !== newApi.summary) {
    changes.push({
      type: 'summary',
      old: oldApi.summary,
      new: newApi.summary,
    });
  }

  if (oldApi.description !== newApi.description) {
    changes.push({
      type: 'description',
      old: oldApi.description,
      new: newApi.description,
    });
  }

  // 태그 변경
  const oldTags = oldApi.tags.sort().join(', ');
  const newTags = newApi.tags.sort().join(', ');
  if (oldTags !== newTags) {
    changes.push({
      type: 'tags',
      old: oldTags,
      new: newTags,
    });
  }

  // 파라미터 변경
  const oldParams = oldApi.parameters
    .map((p) => `${p.name}(${p.in})`)
    .sort()
    .join(', ');
  const newParams = newApi.parameters
    .map((p) => `${p.name}(${p.in})`)
    .sort()
    .join(', ');
  if (oldParams !== newParams) {
    changes.push({
      type: 'parameters',
      old: oldParams,
      new: newParams,
    });
  }

  return changes;
}

/**
 * 태그 변경사항을 비교합니다
 */
function compareTags(oldTags, newTags) {
  const oldTagNames = oldTags.map((t) => t.name).sort();
  const newTagNames = newTags.map((t) => t.name).sort();

  return {
    added: newTagNames.filter((name) => !oldTagNames.includes(name)),
    removed: oldTagNames.filter((name) => !newTagNames.includes(name)),
    unchanged: oldTagNames.filter((name) => newTagNames.includes(name)),
  };
}

/**
 * 스키마 변경사항을 비교합니다
 */
function compareSchemas(oldSchemas, newSchemas) {
  return {
    added: newSchemas.filter((name) => !oldSchemas.includes(name)),
    removed: oldSchemas.filter((name) => !newSchemas.includes(name)),
    unchanged: oldSchemas.filter((name) => newSchemas.includes(name)),
  };
}

/**
 * 마크다운 리포트를 생성합니다
 */
function generateMarkdownReport(changes, tagChanges, schemaChanges, oldCommit, newCommit) {
  const timestamp = new Date().toISOString();

  let report = `# 🔄 Swagger API 변경사항 분석 리포트

**분석 기간**: ${oldCommit} → ${newCommit}  
**생성 시간**: ${timestamp}

## 📊 변경사항 요약

- **추가된 API**: ${changes.added.length}개
- **제거된 API**: ${changes.removed.length}개  
- **변경된 API**: ${changes.modified.length}개
- **변경없는 API**: ${changes.unchanged.length}개

`;

  // 추가된 API
  if (changes.added.length > 0) {
    report += `## ➕ 추가된 API (${changes.added.length}개)

| Operation ID | Method | Path | Summary | Tags |
|-------------|--------|------|---------|------|
`;
    changes.added.forEach((api) => {
      report += `| \`${api.operationId}\` | ${api.method} | \`${api.path}\` | ${api.summary} | ${api.tags.join(', ')} |\n`;
    });
    report += '\n';
  }

  // 제거된 API
  if (changes.removed.length > 0) {
    report += `## ➖ 제거된 API (${changes.removed.length}개)

| Operation ID | Method | Path | Summary | Tags |
|-------------|--------|------|---------|------|
`;
    changes.removed.forEach((api) => {
      report += `| \`${api.operationId}\` | ${api.method} | \`${api.path}\` | ${api.summary} | ${api.tags.join(', ')} |\n`;
    });
    report += '\n';
  }

  // 변경된 API
  if (changes.modified.length > 0) {
    report += `## 🔄 변경된 API (${changes.modified.length}개)

`;
    changes.modified.forEach((change) => {
      report += `### \`${change.operationId}\`

`;
      change.changes.forEach((mod) => {
        report += `- **${mod.type}**: \`${mod.old}\` → \`${mod.new}\`\n`;
      });
      report += '\n';
    });
  }

  // 태그 변경사항
  if (tagChanges.added.length > 0 || tagChanges.removed.length > 0) {
    report += `## 🏷️ 태그 변경사항

`;
    if (tagChanges.added.length > 0) {
      report += `### ➕ 추가된 태그
${tagChanges.added.map((tag) => `- \`${tag}\``).join('\n')}

`;
    }
    if (tagChanges.removed.length > 0) {
      report += `### ➖ 제거된 태그
${tagChanges.removed.map((tag) => `- \`${tag}\``).join('\n')}

`;
    }
  }

  // 스키마 변경사항
  if (schemaChanges.added.length > 0 || schemaChanges.removed.length > 0) {
    report += `## 📋 스키마 변경사항

`;
    if (schemaChanges.added.length > 0) {
      report += `### ➕ 추가된 스키마
${schemaChanges.added.map((schema) => `- \`${schema}\``).join('\n')}

`;
    }
    if (schemaChanges.removed.length > 0) {
      report += `### ➖ 제거된 스키마
${schemaChanges.removed.map((schema) => `- \`${schema}\``).join('\n')}

`;
    }
  }

  // API 매핑 테이블
  if (changes.modified.length > 0) {
    report += `## 🔗 API 매핑 테이블

| 기존 API | 변경된 API | 변경 내용 |
|---------|-----------|----------|
`;
    changes.modified.forEach((change) => {
      const changeSummary = change.changes.map((c) => `${c.type}: ${c.old} → ${c.new}`).join(', ');
      report += `| \`${change.operationId}\` | \`${change.operationId}\` | ${changeSummary} |\n`;
    });
    report += '\n';
  }

  // 제거된 API 매핑
  if (changes.removed.length > 0) {
    report += `## ❌ 제거된 API 목록

| Operation ID | Method | Path | Summary |
|-------------|--------|------|---------|
`;
    changes.removed.forEach((api) => {
      report += `| \`${api.operationId}\` | ${api.method} | \`${api.path}\` | ${api.summary} |\n`;
    });
    report += '\n';
  }

  report += `---
*이 리포트는 \`scripts/analyze-swagger-changes.mjs\` 스크립트로 자동 생성되었습니다.*
`;

  return report;
}

/**
 * 메인 실행 함수
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log(`
사용법: node scripts/analyze-swagger-changes.mjs <old-commit> <new-commit> [output-file]

예시:
  node scripts/analyze-swagger-changes.mjs HEAD~1 HEAD
  node scripts/analyze-swagger-changes.mjs abc123 def456 changes.md
  node scripts/analyze-swagger-changes.mjs HEAD~3 HEAD changes.mdc
`);
    process.exit(1);
  }

  const [oldCommit, newCommit, outputFile] = args;

  console.log(`🔍 Swagger 변경사항 분석 중...`);
  console.log(`📅 ${oldCommit} → ${newCommit}`);

  try {
    // 이전 버전과 새 버전의 swagger.json 로드
    const oldSwagger = getSwaggerFromCommit(oldCommit);
    const newSwagger = getSwaggerFromCommit(newCommit);

    // API 엔드포인트 추출
    const oldEndpoints = extractApiEndpoints(oldSwagger);
    const newEndpoints = extractApiEndpoints(newSwagger);

    // 태그 추출
    const oldTags = extractTags(oldSwagger);
    const newTags = extractTags(newSwagger);

    // 스키마 추출
    const oldSchemas = extractSchemas(oldSwagger);
    const newSchemas = extractSchemas(newSwagger);

    // 변경사항 분석
    const endpointChanges = compareEndpoints(oldEndpoints, newEndpoints);
    const tagChanges = compareTags(oldTags, newTags);
    const schemaChanges = compareSchemas(oldSchemas, newSchemas);

    // 마크다운 리포트 생성
    const report = generateMarkdownReport(
      endpointChanges,
      tagChanges,
      schemaChanges,
      oldCommit,
      newCommit
    );

    // 출력
    if (outputFile) {
      fs.writeFileSync(outputFile, report, 'utf8');
      console.log(`✅ 리포트가 ${outputFile}에 저장되었습니다.`);
    } else {
      console.log(report);
    }

    // 요약 출력
    console.log(`
📊 분석 완료:
  ➕ 추가된 API: ${endpointChanges.added.length}개
  ➖ 제거된 API: ${endpointChanges.removed.length}개
  🔄 변경된 API: ${endpointChanges.modified.length}개
  🏷️ 태그 변경: +${tagChanges.added.length} -${tagChanges.removed.length}
  📋 스키마 변경: +${schemaChanges.added.length} -${schemaChanges.removed.length}
`);
  } catch (error) {
    console.error('❌ 분석 중 오류 발생:', error.message);
    process.exit(1);
  }
}

// 스크립트 실행
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
