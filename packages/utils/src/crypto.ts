/**
 * 문자열을 SHA-256 해시로 변환
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

/**
 * 문자열을 MD5 해시로 변환 (간단한 구현)
 */
export function md5(message: string): string {
  // 간단한 MD5 구현 (실제 프로덕션에서는 crypto-js 등의 라이브러리 사용 권장)
  let hash = 0;
  if (message.length === 0) return hash.toString();

  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit 정수로 변환
  }

  return hash.toString();
}

/**
 * 랜덤 문자열 생성
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

/**
 * 랜덤 숫자 생성
 */
export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * UUID v4 생성
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Base64 인코딩
 */
export function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Base64 디코딩
 */
export function decodeBase64(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

/**
 * URL 안전한 Base64 인코딩
 */
export function encodeBase64URL(str: string): string {
  return encodeBase64(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * URL 안전한 Base64 디코딩
 */
export function decodeBase64URL(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return decodeBase64(str);
}

/**
 * 간단한 문자열 암호화 (실제 프로덕션에서는 더 강력한 암호화 사용 권장)
 */
export function simpleEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return encodeBase64(result);
}

/**
 * 간단한 문자열 복호화
 */
export function simpleDecrypt(encryptedText: string, key: string): string {
  const decoded = decodeBase64(encryptedText);
  let result = '';
  for (let i = 0; i < decoded.length; i++) {
    const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * 비밀번호 해시 생성 (간단한 구현)
 */
export async function hashPassword(
  password: string,
  salt?: string
): Promise<{ hash: string; salt: string }> {
  const generatedSalt = salt || generateRandomString(16);
  const combined = password + generatedSalt;
  const hash = await sha256(combined);
  return { hash, salt: generatedSalt };
}

/**
 * 비밀번호 검증
 */
export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
): Promise<boolean> {
  const { hash: computedHash } = await hashPassword(password, salt);
  return computedHash === hash;
}

/**
 * JWT 토큰 생성 (간단한 구현)
 */
export function generateJWT(payload: Record<string, unknown>, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = encodeBase64URL(JSON.stringify(header));
  const encodedPayload = encodeBase64URL(JSON.stringify(payload));
  const signature = simpleEncrypt(`${encodedHeader}.${encodedPayload}`, secret);

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * JWT 토큰 검증 (간단한 구현)
 */
export function verifyJWT(token: string, secret: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = simpleEncrypt(`${header}.${payload}`, secret);

    if (signature !== expectedSignature) return null;

    return JSON.parse(decodeBase64URL(payload));
  } catch {
    return null;
  }
}
