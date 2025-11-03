import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/vue3';

// CSS 파일 import
import '../src/styles/index.scss'; // 컴포넌트 스타일
import '../src/style.css'; // 기본 테마 및 Tailwind

import { defineComponent } from 'vue';

// 중앙 정렬 데코레이터 (docs에서 제외)
const CenterDecorator = (storyFn: any, context: any) => {
  // docs 페이지인지 확인
  const isDocsPage = context.parameters?.docs?.page || context.viewMode === 'docs';

  // Design Tokens 스토리에서는 중앙정렬 제외
  const isDesignTokensStory = context.title === 'Foundations/Design Tokens';

  if (isDesignTokensStory) {
    // Design Tokens 스토리에서만 중앙정렬 제외
    return defineComponent({
      name: 'CenterDecorator',
      template: `
        <div style="width: 100%;">
          <component :is="storyComponent" />
        </div>
      `,
      setup() {
        return {
          storyComponent: storyFn(),
        };
      },
    });
  }

  if (isDocsPage) {
    // docs 페이지에서는 가로 중앙 정렬만 적용
    return defineComponent({
      name: 'CenterDecorator',
      template: `
        <div style="display: flex; justify-content: center; width: 100%;">
          <component :is="storyComponent" />
        </div>
      `,
      setup() {
        return {
          storyComponent: storyFn(),
        };
      },
    });
  }

  // 일반 스토리에서는 중앙 정렬 적용
  return defineComponent({
    name: 'CenterDecorator',
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
        <component :is="storyComponent" />
      </div>
    `,
    setup() {
      return {
        storyComponent: storyFn(),
      };
    },
  });
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          '*', // 기본적으로는 알파벳 순
          'Icons', // Icons를 맨 아래로
          'Foundations', // Foundations를 맨 아래로
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      autodocs: true,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    CenterDecorator,
  ],
};

export default preview;
