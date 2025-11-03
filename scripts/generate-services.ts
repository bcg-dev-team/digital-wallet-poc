#!/usr/bin/env tsx

/**
 * OpenAPI Swagger JSON으로부터 서비스 클래스를 자동 생성하는 스크립트
 * 기존 프로젝트 패턴을 준수하여 생성
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const swaggerPath = join(projectRoot, 'swagger.json');
const outputDir = join(projectRoot, 'packages/api/src/services/generated');
const API_PREFIX = '/main/v1';

interface SwaggerPath {
  [method: string]: {
    tags: string[];
    summary: string;
    description: string;
    operationId: string;
    parameters?: Array<{
      name: string;
      in: 'path' | 'query' | 'header' | 'cookie';
      required?: boolean;
      description?: string;
      schema?: any;
    }>;
    requestBody?: {
      content: {
        [contentType: string]: {
          schema: {
            $ref?: string;
            type?: string;
          };
        };
      };
    };
    responses: {
      [statusCode: string]: {
        description?: string;
        content?: {
          [contentType: string]: {
            schema: {
              $ref?: string;
              type?: string;
            };
          };
        };
      };
    };
  };
}

interface SwaggerSpec {
  openapi: string;
  info: any;
  tags: Array<{ name: string; description: string }>;
  paths: {
    [path: string]: SwaggerPath;
  };
  components: {
    schemas: any;
  };
}

interface MultipartField {
  name: string;
  type: 'file' | 'file-array' | 'json';
  required: boolean;
  jsonType?: string; // $ref인 경우 타입명
}

interface ServiceMethod {
  name: string;
  summary: string;
  description: string;
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    location: 'path' | 'query' | 'body';
  }>;
  requestType?: string;
  responseType?: string;
  contentType?: 'application/json' | 'multipart/form-data';
  multipartFields?: MultipartField[]; // multipart/form-data 필드 정보
}

interface ServiceDefinition {
  name: string;
  tag: string;
  description: string;
  methods: ServiceMethod[];
  imports: Set<string>;
}

/**
 * Swagger JSON 로드
 */
function loadSwagger(): SwaggerSpec {
  const content = readFileSync(swaggerPath, 'utf-8');
  return JSON.parse(content);
}

/**
 * operationId를 기존 패턴의 메서드명으로 변환
 */
function convertOperationIdToMethodName(operationId: string): string {
  // camelCase 그대로 사용하되, 필요시 변환 규칙 추가
  const mappings: Record<string, string> = {
    sendAccountCreate: 'createAccount',
    refreshTokensForWeb: 'refreshTokenForWeb',
    refreshTokensForApp: 'refreshTokenForApp',
    sendEmailVerificationCode: 'sendEmailVerificationCode',
    verifyEmailVerificationCode: 'verifyEmailVerificationCode',
    sendSmsVerificationCode: 'sendSmsVerificationCode',
    verifySmsVerificationCode: 'verifySmsVerificationCode',
  };

  return mappings[operationId] || operationId;
}

/**
 * $ref에서 타입명 추출
 * ResponseData* 타입명을 그대로 사용 (consolidate 스크립트가 처리)
 * @note Request/Response DTO는 Dto 접미사를 제거하되, ResponseData*는 그대로 유지
 */
function extractTypeName(ref: string): string {
  const typeName = ref.split('/').pop() || '';

  // ResponseData로 시작하는 경우 Dto 제거하지 않음 (이미 consolidate에서 처리됨)
  if (typeName.startsWith('ResponseData')) {
    return typeName;
  }

  // Request/Response DTO는 OpenAPI Generator가 Dto 제거하므로, 여기서도 제거
  return typeName.replace(/Dto$/, '');
}

/**
 * Swagger paths를 서비스별로 그룹화
 */
function groupByService(swagger: SwaggerSpec): Map<string, ServiceDefinition> {
  const services = new Map<string, ServiceDefinition>();

  for (const [path, pathItem] of Object.entries(swagger.paths)) {
    for (const [method, operation] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue;

      const tag = operation.tags?.[0] || 'Default';
      const tagInfo = swagger.tags.find((t) => t.name === tag);

      if (!services.has(tag)) {
        // 서비스명: 하이픈 제거 후 PascalCase로 변환
        const serviceName =
          tag
            .split('-')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join('') + 'Service';

        services.set(tag, {
          name: serviceName,
          tag,
          description: tagInfo?.description || `${tag} 관련 API 서비스`,
          methods: [],
          imports: new Set(),
        });
      }

      const service = services.get(tag)!;

      // Request 타입 및 Content-Type 추출
      let requestType: string | undefined;
      let contentType: 'application/json' | 'multipart/form-data' = 'application/json';
      let multipartFields: MultipartField[] | undefined;

      // JSON 요청
      if (operation.requestBody?.content?.['application/json']?.schema?.$ref) {
        requestType = extractTypeName(
          operation.requestBody.content['application/json'].schema.$ref
        );
        service.imports.add(requestType);
        contentType = 'application/json';
      }
      // Multipart form-data 요청
      else if (operation.requestBody?.content?.['multipart/form-data']?.schema?.$ref) {
        const schemaRef = operation.requestBody.content['multipart/form-data'].schema.$ref;
        requestType = extractTypeName(schemaRef);
        service.imports.add(requestType);
        contentType = 'multipart/form-data';

        // multipart/form-data 스키마 분석
        const schemaName = schemaRef.split('/').pop();
        const schema = swagger.components.schemas[schemaName!];

        if (schema?.properties) {
          multipartFields = [];
          const required = schema.required || [];

          for (const [fieldName, fieldDef] of Object.entries(schema.properties)) {
            const field = fieldDef as any;

            // 파일 필드 (binary format)
            if (field.format === 'binary') {
              multipartFields.push({
                name: fieldName,
                type: 'file',
                required: required.includes(fieldName),
              });
            }
            // 파일 배열 필드
            else if (field.type === 'array' && field.items?.format === 'binary') {
              multipartFields.push({
                name: fieldName,
                type: 'file-array',
                required: required.includes(fieldName),
              });
            }
            // JSON 객체 필드 ($ref)
            else if (field.$ref) {
              const jsonType = extractTypeName(field.$ref);
              service.imports.add(jsonType);
              multipartFields.push({
                name: fieldName,
                type: 'json',
                required: required.includes(fieldName),
                jsonType,
              });
            }
          }
        }
      }

      // Response 타입 추출
      let responseType: string | undefined;
      const response200 = operation.responses['200'];
      if (response200?.content?.['application/json']?.schema?.$ref) {
        responseType = extractTypeName(response200.content['application/json'].schema.$ref);
        service.imports.add(responseType);
      }

      // Parameters 추출
      const parameters: ServiceMethod['parameters'] = [];

      // Path parameters
      const pathParams = path.match(/\{([^}]+)\}/g);
      if (pathParams) {
        pathParams.forEach((param) => {
          const paramName = param.slice(1, -1);
          const paramInfo = operation.parameters?.find(
            (p) => p.name === paramName && p.in === 'path'
          );
          parameters.push({
            name: paramName,
            type: 'string', // 일반적으로 path params는 string
            required: true,
            description: paramInfo?.description || paramName,
            location: 'path',
          });
        });
      }

      // Request body를 parameters로 추가
      if (requestType) {
        parameters.push({
          name: 'request',
          type: requestType,
          required: true,
          description: `${operation.summary} 요청 데이터`,
          location: 'body',
        });
      }

      // Query parameters가 있는 경우 처리
      const queryParams = operation.parameters?.filter((p) => p.in === 'query') || [];
      if (queryParams.length > 0 && !requestType) {
        // 단일 query parameter인 경우
        if (queryParams.length === 1) {
          const param = queryParams[0];
          let paramType: string;

          // $ref 타입인 경우 바로 사용
          if (param.schema?.$ref) {
            paramType = extractTypeName(param.schema.$ref);
            service.imports.add(paramType);
          }
          // Primitive 타입인 경우도 바로 사용
          else {
            paramType = param.schema?.type || 'string';
            // integer -> number 변환
            if (paramType === 'integer') {
              paramType = 'number';
            }
          }

          parameters.push({
            name: 'request',
            type: paramType,
            required: param.required || false,
            description: `${operation.summary} 요청 데이터`,
            location: 'query',
          });
        } else {
          // 여러 개인 경우 인라인 객체로 생성
          const queryFields = queryParams.map((p) => {
            let paramType = p.schema?.$ref
              ? extractTypeName(p.schema.$ref)
              : p.schema?.type || 'string';

            // integer -> number 변환
            if (paramType === 'integer') {
              paramType = 'number';
            }

            // $ref 타입인 경우 import 추가
            if (p.schema?.$ref) {
              service.imports.add(paramType);
            }

            const optional = p.required ? '' : '?';
            return `${p.name}${optional}: ${paramType}`;
          });

          const inlineType = `{ ${queryFields.join('; ')} }`;

          parameters.push({
            name: 'request',
            type: inlineType,
            required: false, // query params는 보통 optional
            description: `${operation.summary} 요청 데이터`,
            location: 'query',
          });
        }
      }

      service.methods.push({
        name: convertOperationIdToMethodName(operation.operationId),
        summary: operation.summary,
        description: operation.description,
        httpMethod: method as any,
        path,
        parameters,
        requestType,
        responseType,
        contentType,
        multipartFields,
      });
    }
  }

  return services;
}

/**
 * 서비스 클래스 코드 생성
 */
function generateServiceCode(service: ServiceDefinition, swagger: SwaggerSpec): string {
  const lines: string[] = [];

  // Imports
  const typeImports = Array.from(service.imports).sort();
  if (typeImports.length > 0) {
    lines.push(`import {`);
    typeImports.forEach((type) => {
      lines.push(`  ${type},`);
    });
    lines.push(`} from '../../generated-types';`);
  }
  lines.push(`import { CustomAxiosInstance } from '../../types';`);
  lines.push('');

  // Class declaration
  lines.push(`/**`);
  lines.push(` * ${service.description}`);
  lines.push(` * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합`);
  lines.push(` */`);
  lines.push(`export class ${service.name} {`);
  lines.push(`  private axios: CustomAxiosInstance;`);
  lines.push('');
  lines.push(`  constructor(axiosInstance: CustomAxiosInstance) {`);
  lines.push(`    this.axios = axiosInstance;`);
  lines.push(`  }`);
  lines.push('');

  // Methods
  service.methods.forEach((method, index) => {
    if (index > 0) lines.push('');

    // JSDoc
    lines.push(`  /**`);
    lines.push(`   * ${method.summary}`);
    if (method.description && method.description !== method.summary) {
      lines.push(`   * ${method.description}`);
    }

    // Parameters documentation
    method.parameters.forEach((param) => {
      if (param.location !== 'body') {
        lines.push(`   * @param ${param.name} - ${param.description}`);
      }
    });

    if (method.responseType) {
      lines.push(`   * @returns ${method.summary} 결과`);
    }
    lines.push(`   */`);

    // Method signature
    const methodParams: string[] = [];

    // Path parameters
    const pathParams = method.parameters.filter((p) => p.location === 'path');
    pathParams.forEach((p) => {
      const optional = !p.required ? '?' : '';
      methodParams.push(`${p.name}${optional}: ${p.type}`);
    });

    // Request parameter (body 또는 query)
    const requestParam = method.parameters.find(
      (p) => p.location === 'body' || p.location === 'query'
    );
    if (requestParam) {
      // multipart/form-data인 경우 파일 필드를 포함한 인라인 타입 생성
      if (method.contentType === 'multipart/form-data' && method.multipartFields) {
        const jsonField = method.multipartFields.find((f) => f.type === 'json');
        const fileFields = method.multipartFields.filter(
          (f) => f.type === 'file' || f.type === 'file-array'
        );

        if (jsonField && fileFields.length > 0) {
          // 인라인 타입: JSON 필드 + 파일 필드
          const fileFieldTypes = fileFields
            .map((f) => {
              const optional = f.required ? '' : '?';
              const type = f.type === 'file' ? 'File' : 'File[]';
              return `${f.name}${optional}: ${type}`;
            })
            .join('; ');

          methodParams.push(`${requestParam.name}: ${jsonField.jsonType} & { ${fileFieldTypes} }`);
        } else {
          methodParams.push(`${requestParam.name}: ${requestParam.type}`);
        }
      } else {
        methodParams.push(`request: ${requestParam.type}`);
      }
    }

    const returnType = method.responseType
      ? `Promise<AxiosResponse<${method.responseType}>>`
      : 'Promise<AxiosResponse>';

    lines.push(`  ${method.name}(${methodParams.join(', ')}) {`);

    // Method body
    const hasRequestBody = method.httpMethod === 'post' || method.httpMethod === 'put';
    const hasRequestParam = method.parameters.some(
      (p) => p.location === 'body' || p.location === 'query'
    );

    // FormData 생성 로직 (multipart/form-data인 경우)
    if (
      method.contentType === 'multipart/form-data' &&
      requestParam?.location === 'body' &&
      method.multipartFields
    ) {
      lines.push(`    const formData = new FormData();`);
      lines.push(``);

      // JSON 필드 처리
      const jsonFields = method.multipartFields.filter((f) => f.type === 'json');
      if (jsonFields.length > 0) {
        jsonFields.forEach((field) => {
          lines.push(`    // ${field.name} JSON 데이터`);
          lines.push(`    const ${field.name}Data: ${field.jsonType} = {`);

          // Swagger 스키마에서 필드 정보 가져오기
          const schemaName = field.jsonType;
          const schema = schemaName ? swagger.components.schemas[schemaName] : undefined;

          if (schema?.properties) {
            const props = Object.keys(schema.properties);
            props.forEach((prop, idx) => {
              const comma = idx < props.length - 1 ? ',' : '';
              lines.push(`      ${prop}: ${requestParam.name}.${prop}${comma}`);
            });
          }

          lines.push(`    };`);
          lines.push(`    formData.append('${field.name}', JSON.stringify(${field.name}Data));`);
          lines.push(``);
        });
      }

      // 파일 필드 처리
      const fileFields = method.multipartFields.filter((f) => f.type === 'file');
      if (fileFields.length > 0) {
        lines.push(`    // 파일 필드들`);
        fileFields.forEach((field) => {
          if (field.required) {
            lines.push(`    formData.append('${field.name}', ${requestParam.name}.${field.name});`);
          } else {
            lines.push(`    if (${requestParam.name}.${field.name}) {`);
            lines.push(
              `      formData.append('${field.name}', ${requestParam.name}.${field.name});`
            );
            lines.push(`    }`);
          }
        });
        lines.push(``);
      }

      // 파일 배열 필드 처리
      const fileArrayFields = method.multipartFields.filter((f) => f.type === 'file-array');
      if (fileArrayFields.length > 0) {
        fileArrayFields.forEach((field) => {
          lines.push(`    // ${field.name} (파일 배열)`);
          if (field.required) {
            lines.push(`    ${requestParam.name}.${field.name}.forEach((file) => {`);
            lines.push(`      formData.append('${field.name}', file);`);
            lines.push(`    });`);
          } else {
            lines.push(`    if (${requestParam.name}.${field.name}) {`);
            lines.push(`      ${requestParam.name}.${field.name}.forEach((file) => {`);
            lines.push(`        formData.append('${field.name}', file);`);
            lines.push(`      });`);
            lines.push(`    }`);
          }
          lines.push(``);
        });
      }
    }

    // Path 변환 (path parameters 치환 및 prefix 추가)
    let pathStr = API_PREFIX + method.path;
    method.parameters
      .filter((p) => p.location === 'path')
      .forEach((param) => {
        pathStr = pathStr.replace(`{${param.name}}`, `\${${param.name}}`);
      });

    if (hasRequestBody && requestParam?.location === 'body') {
      // Request body 구성
      if (method.httpMethod === 'post') {
        lines.push(`    return this.axios.post<${method.responseType}>(`);
      } else {
        lines.push(`    return this.axios.put<${method.responseType}>(`);
      }
      lines.push(`      \`${pathStr}\`,`);

      // multipart/form-data인 경우 formData 사용, 아니면 request 사용
      if (method.contentType === 'multipart/form-data') {
        lines.push(`      formData,`);
      } else {
        lines.push(`      request,`);
      }

      // multipart/form-data인 경우 헤더 추가
      if (method.contentType === 'multipart/form-data') {
        lines.push(`      {`);
        lines.push(`        headers: {`);
        lines.push(`          'Content-Type': 'multipart/form-data',`);
        lines.push(`        },`);
        lines.push(`      }`);
      }

      lines.push(`    );`);
    } else if (hasRequestParam && requestParam?.location === 'query') {
      // Query parameters - Custom API 방식으로 수정
      lines.push(`    return this.axios.${method.httpMethod}<${method.responseType}>(`);
      lines.push(`      \`${pathStr}\`,`);
      lines.push(`      {`);
      lines.push(`        params: request`);
      lines.push(`      }`);
      lines.push(`    );`);
    } else {
      // Simple GET or DELETE
      lines.push(`    return this.axios.${method.httpMethod}<${method.responseType}>(`);
      lines.push(`      \`${pathStr}\``);
      lines.push(`    );`);
    }

    lines.push(`  }`);
  });

  lines.push(`}`);
  lines.push('');

  return lines.join('\n');
}

/**
 * 서비스 index.ts 생성
 */
function generateIndexFile(services: ServiceDefinition[]): string {
  const lines: string[] = [];

  lines.push(`/**`);
  lines.push(` * Generated API 서비스 클래스`);
  lines.push(` * OpenAPI Generator로 생성된 타입을 사용하여 기존 서비스 패턴 준수`);
  lines.push(` */`);
  lines.push('');

  services.forEach((service) => {
    // 파일명에서 하이픈 제거
    const filename = service.tag.toLowerCase().replace(/-/g, '');
    lines.push(`export { ${service.name} } from './${filename}.service';`);
  });

  lines.push('');

  return lines.join('\n');
}

/**
 * 생성된 파일들 Prettier 포매팅
 */
function formatGeneratedFiles() {
  try {
    console.log('✨ 생성된 파일 포매팅 중...');

    const command = `prettier --write "${outputDir}/**/*.ts"`;

    execSync(command, {
      stdio: 'inherit',
      cwd: projectRoot,
    });

    console.log('✅ 파일 포매팅 완료!\n');
  } catch (error) {
    console.warn('⚠️  파일 포매팅 중 오류 발생:', (error as Error).message);
  }
}

/**
 * 메인 실행
 */
function main() {
  console.log('🚀 서비스 클래스 자동 생성 시작...\n');

  // Swagger 로드
  const swagger = loadSwagger();
  console.log(`✅ Swagger JSON 로드 완료`);
  console.log(`   - Tags: ${swagger.tags.map((t) => t.name).join(', ')}\n`);

  // 서비스별로 그룹화
  const services = groupByService(swagger);
  console.log(`📦 서비스 그룹화 완료: ${services.size}개 서비스\n`);

  // 출력 디렉토리 생성
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // 각 서비스 파일 생성
  let totalMethods = 0;
  for (const [tag, service] of services.entries()) {
    // 파일명에서 하이픈을 제거하고 camelCase로 변환
    const filename = `${tag.toLowerCase().replace(/-/g, '')}.service.ts`;
    const filepath = join(outputDir, filename);
    const code = generateServiceCode(service, swagger);

    writeFileSync(filepath, code, 'utf-8');

    console.log(`✅ ${filename}`);
    console.log(`   - ${service.methods.length}개 메서드`);
    console.log(`   - ${service.imports.size}개 타입 import\n`);

    totalMethods += service.methods.length;
  }

  // index.ts 생성
  const indexCode = generateIndexFile(Array.from(services.values()));
  writeFileSync(join(outputDir, 'index.ts'), indexCode, 'utf-8');
  console.log(`✅ index.ts 생성 완료\n`);

  // 생성된 파일들 포매팅
  formatGeneratedFiles();

  console.log('================================');
  console.log(`🎉 서비스 클래스 생성 완료!`);
  console.log(`📁 생성된 서비스: ${services.size}개`);
  console.log(`🔧 생성된 메서드: ${totalMethods}개`);
  console.log(`📂 출력 위치: ${outputDir}`);
}

main();
