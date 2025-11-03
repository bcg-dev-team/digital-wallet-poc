/**
 * 아이콘 레지스트리
 * vite-svg-loader와 import.meta.glob을 활용하여 모든 SVG 아이콘을 정적으로 import
 */

// 일반 아이콘들
const iconModules = import.meta.glob('../../assets/icons/*.svg', { eager: true });

// 플래그 아이콘들
const flagModules = import.meta.glob('../../assets/icons/flags/*.svg', { eager: true });

// 트레이드 아이콘들
const tradeModules = import.meta.glob('../../assets/icons/trade/*.svg', { eager: true });

// 아이콘 이름을 키로 하는 매핑 생성
export const iconRegistry = new Map<string, any>();

// 일반 아이콘 등록
Object.entries(iconModules).forEach(([path, module]) => {
  const name = path.split('/').pop()?.replace('.svg', '');
  if (name) {
    iconRegistry.set(name, (module as any).default);
  }
});

// 플래그 아이콘 등록
Object.entries(flagModules).forEach(([path, module]) => {
  const name = path.split('/').pop()?.replace('.svg', '');
  if (name) {
    iconRegistry.set(name, (module as any).default);
  }
});

// 트레이드 아이콘 등록
Object.entries(tradeModules).forEach(([path, module]) => {
  const name = path.split('/').pop()?.replace('.svg', '');
  if (name) {
    iconRegistry.set(name, (module as any).default);
  }
});

// 아이콘 컴포넌트 가져오기 함수
export const getIconComponent = (name: string) => {
  return iconRegistry.get(name) || null;
};
