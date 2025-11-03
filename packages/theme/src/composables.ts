import { computed, watch, type Ref } from 'vue';
import { useThemeStore } from './store';

/**
 * 테마 타입 정의
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * 테마 컴포저블 반환 타입
 */
export interface ThemeComposable {
  isDark: Ref<boolean>;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
  setSystemTheme: () => void;
  updateHtmlClass: () => void;
}

/**
 * 전역 테마 관리 컴포저블
 * 모든 앱에서 공유되는 테마 로직을 제공합니다.
 */
export function useTheme(): ThemeComposable {
  const themeStore = useThemeStore();

  /**
   * body 요소에 data-theme 속성을 설정합니다.
   */
  const updateHtmlClass = () => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light');
  };

  // 테마 변경 시 HTML 클래스 업데이트
  watch(
    () => themeStore.isDark,
    () => {
      updateHtmlClass();
    },
    { immediate: true }
  );

  return {
    isDark: computed(() => themeStore.isDark),
    toggleTheme: themeStore.toggleTheme,
    setTheme: themeStore.setTheme,
    setSystemTheme: themeStore.setSystemTheme,
    updateHtmlClass,
  };
}

/**
 * 전역 테마 인스턴스 (싱글톤)
 */
let globalThemeInstance: ThemeComposable | null = null;

/**
 * 전역 테마 컴포저블 (싱글톤 패턴)
 * 앱 전체에서 동일한 테마 인스턴스를 공유합니다.
 */
export function useGlobalTheme(): ThemeComposable {
  if (!globalThemeInstance) {
    globalThemeInstance = useTheme();
  }
  return globalThemeInstance;
}
