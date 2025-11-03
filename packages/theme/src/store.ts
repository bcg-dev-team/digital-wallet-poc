import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * localStorage 키 상수
 */
const THEME_MODE_KEY = 'theme-mode';

/**
 * 전역 테마 상태 관리 스토어
 * 모든 앱에서 공유되는 테마 설정을 관리합니다.
 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false);

  // localStorage에서 테마 설정 복원 (안전한 접근)
  let savedTheme: string | null = null;
  try {
    if (typeof localStorage !== 'undefined') {
      savedTheme = localStorage.getItem(THEME_MODE_KEY);
    }
  } catch {
    // localStorage 접근 실패 시 기본값 사용
  }

  if (savedTheme === 'dark') {
    isDark.value = true;
  }

  /**
   * 테마를 토글합니다.
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_MODE_KEY, isDark.value ? 'dark' : 'light');
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }
  };

  /**
   * 특정 테마로 설정합니다.
   * @param dark - 다크 테마 여부
   */
  const setTheme = (dark: boolean) => {
    isDark.value = dark;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_MODE_KEY, dark ? 'dark' : 'light');
      }
    } catch {
      // localStorage 접근 실패 시 무시
    }
  };

  /**
   * 시스템 테마를 감지하여 설정합니다.
   */
  const setSystemTheme = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      isDark.value = mediaQuery.matches;
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_MODE_KEY, isDark.value ? 'dark' : 'light');
        }
      } catch {
        // localStorage 접근 실패 시 무시
      }
    }
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
    setSystemTheme,
  };
});
