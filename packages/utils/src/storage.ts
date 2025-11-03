/**
 * 로컬 스토리지에 데이터 저장
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * 로컬 스토리지에서 데이터 가져오기
 */
export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue || null;
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return defaultValue || null;
  }
}

/**
 * 로컬 스토리지에서 데이터 삭제
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

/**
 * 로컬 스토리지 전체 삭제
 */
export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
}

/**
 * 세션 스토리지에 데이터 저장
 */
export function setSessionStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Failed to save to sessionStorage:', error);
  }
}

/**
 * 세션 스토리지에서 데이터 가져오기
 */
export function getSessionStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue || null;
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to read from sessionStorage:', error);
    return defaultValue || null;
  }
}

/**
 * 세션 스토리지에서 데이터 삭제
 */
export function removeSessionStorage(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from sessionStorage:', error);
  }
}

/**
 * 세션 스토리지 전체 삭제
 */
export function clearSessionStorage(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error);
  }
}

/**
 * 쿠키에 데이터 저장
 */
export function setCookie(name: string, value: string, days = 7, path = '/'): void {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${path}`;
}

/**
 * 쿠키에서 데이터 가져오기
 */
export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}

/**
 * 쿠키에서 데이터 삭제
 */
export function removeCookie(name: string, path = '/'): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=${path}`;
}

/**
 * 스토리지 사용량 확인
 */
export function getStorageUsage(): {
  localStorage: number;
  sessionStorage: number;
  total: number;
} {
  let localStorageSize = 0;
  let sessionStorageSize = 0;

  try {
    // localStorage 크기 계산
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        localStorageSize += localStorage[key].length + key.length;
      }
    }

    // sessionStorage 크기 계산
    for (const key in sessionStorage) {
      if (Object.prototype.hasOwnProperty.call(sessionStorage, key)) {
        sessionStorageSize += sessionStorage[key].length + key.length;
      }
    }
  } catch (error) {
    console.error('Failed to calculate storage usage:', error);
  }

  return {
    localStorage: localStorageSize,
    sessionStorage: sessionStorageSize,
    total: localStorageSize + sessionStorageSize,
  };
}

/**
 * 스토리지 키 목록 가져오기
 */
export function getStorageKeys(storage: 'local' | 'session' = 'local'): string[] {
  try {
    const targetStorage = storage === 'local' ? localStorage : sessionStorage;
    return Object.keys(targetStorage);
  } catch (error) {
    console.error('Failed to get storage keys:', error);
    return [];
  }
}
