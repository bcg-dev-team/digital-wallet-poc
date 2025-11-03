class LocalStorageService {
  STORAGE_KEY_PREFIX = 'moda_localstorage_';

  setItem(key: string, value: any) {
    localStorage.setItem(this.STORAGE_KEY_PREFIX + key, JSON.stringify(value));
  }

  getItem(key: string, includePrefix = true): string | null {
    if (includePrefix) {
      key = this.STORAGE_KEY_PREFIX + key;
    }

    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      // JSON 파싱 실패 시 원본 문자열 반환
      return item;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(this.STORAGE_KEY_PREFIX + key);
  }

  clearStorage() {
    localStorage.clear();
  }
}

export default new LocalStorageService();
