import {
  getColorTokens,
  getTypographyTokens,
  getSpacingTokens,
  getPaddingTokens,
  getRadiusTokens,
  getButtonTokens,
  getInputTokens,
  getBackgroundTokens,
  getFontTokens,
  getTradeTokens,
  getTableTokens,
  getPopupTokens,
  getNavTokens,
  getSidebarTokens,
} from '@template/theme';
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import '@template/theme';

import './design-tokens.css';

/**
 * 타이포그래피 토큰을 표시하는 컴포넌트
 */
const TypographyToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
    tokenType: { type: String, required: true },
  },
  setup(props) {
    const computedFontSize = computed(() => {
      if (props.tokenType === 'fontSize') {
        return props.tokenValue;
      }
      return '16px';
    });

    const computedLineHeight = computed(() => {
      if (props.tokenType === 'lineHeight') {
        return props.tokenValue;
      }
      return '1.5';
    });

    const computedLetterSpacing = computed(() => {
      if (props.tokenType === 'letterSpacing') {
        return props.tokenValue;
      }
      return 'normal';
    });

    return {
      computedFontSize,
      computedLineHeight,
      computedLetterSpacing,
    };
  },
  template: `
    <div class="typography-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div 
        class="typography-preview"
        :style="{
          fontSize: computedFontSize,
          lineHeight: computedLineHeight,
          letterSpacing: computedLetterSpacing,
        }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  `,
});

/**
 * 색상 토큰을 표시하는 컴포넌트
 */
const ColorToken = defineComponent({
  props: {
    colorName: { type: String, required: true },
    colorValue: { type: String, required: true },
  },
  template: `
    <div class="color-token">
      <div 
        class="color-preview" 
        :style="{ backgroundColor: colorValue }"
        :title="colorValue"
      ></div>
      <div class="color-info">
        <div class="color-name">{{ colorName }}</div>
        <div class="color-value">{{ colorValue }}</div>
      </div>
    </div>
  `,
});

/**
 * 간격 토큰을 표시하는 컴포넌트
 */
const SpacingToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
  },
  template: `
    <div class="size-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div 
        class="size-preview"
        :style="{ width: tokenValue, height: '20px' }"
      ></div>
    </div>
  `,
});

/**
 * 패딩 토큰을 표시하는 컴포넌트
 */
const PaddingToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
  },
  template: `
    <div class="size-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div class="padding-preview-container" :style="{ padding: tokenValue, background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', width: '100%' }">
        <div class="padding-content" :style="{ 
          width: '60px', 
          height: '30px', 
          background: '#3b82f6', 
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: '500'
        }">
          Content
        </div>
      </div>
    </div>
  `,
});

/**
 * 라운드(Radius) 토큰을 표시하는 컴포넌트
 */
const RadiusToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
  },
  template: `
    <div class="size-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div
        class="size-preview radius-preview"
        :style="{ width: '100%', maxWidth: '100px', height: '40px', background: '#f3f4f6', borderRadius: tokenValue, border: '1px solid #3b82f6', margin: '0 auto' }"
      >
      </div>
    </div>
  `,
});

/**
 * 컴포넌트 토큰을 표시하는 컴포넌트 (Button, Input, Background 등)
 */
const ComponentToken = defineComponent({
  props: {
    tokenName: { type: String, required: true },
    tokenValue: { type: String, required: true },
    tokenType: { type: String, required: true },
  },
  setup(props) {
    const isColorToken = computed(() => {
      return (
        props.tokenType === 'button' ||
        props.tokenType === 'input' ||
        props.tokenType === 'background' ||
        props.tokenType === 'font' ||
        props.tokenType === 'trade' ||
        props.tokenType === 'table' ||
        props.tokenType === 'popup' ||
        props.tokenType === 'nav' ||
        props.tokenType === 'sidebar'
      );
    });

    const isBackgroundToken = computed(() => {
      return (
        props.tokenName.includes('background') ||
        props.tokenName.includes('Background') ||
        props.tokenName.includes('bg')
      );
    });

    const isTextToken = computed(() => {
      return (
        props.tokenName.includes('text') ||
        props.tokenName.includes('Text') ||
        props.tokenName.includes('color')
      );
    });

    const isBorderToken = computed(() => {
      return props.tokenName.includes('border') || props.tokenName.includes('Border');
    });

    return {
      isColorToken,
      isBackgroundToken,
      isTextToken,
      isBorderToken,
    };
  },
  template: `
    <div class="component-token">
      <div class="token-info">
        <div class="token-name">{{ tokenName }}</div>
        <div class="token-value">{{ tokenValue }}</div>
      </div>
      <div class="component-preview">
        <div v-if="isColorToken && isBackgroundToken" 
            class="color-preview" 
            :style="{ backgroundColor: tokenValue }"
            :title="tokenValue">
        </div>
        <div v-else-if="isColorToken && isTextToken" 
            class="text-preview" 
            :style="{ color: tokenValue }">
          Text
        </div>
        <div v-else-if="isColorToken && isBorderToken" 
            class="border-preview" 
            :style="{ border: '2px solid ' + tokenValue }">
        </div>
        <div v-else-if="isColorToken" 
            class="color-preview" 
            :style="{ backgroundColor: tokenValue }"
            :title="tokenValue">
        </div>
        <div v-else class="value-preview">
          {{ tokenValue }}
        </div>
      </div>
    </div>
  `,
});

/**
 * 디자인 토큰을 동적으로 표시하는 메인 컴포넌트
 */
const DesignTokens = defineComponent({
  name: 'DesignTokens',
  components: {
    ColorToken,
    TypographyToken,
    SpacingToken,
    PaddingToken,
    RadiusToken,
    ComponentToken,
  },
  setup() {
    const colors = ref<Record<string, Record<string, string>>>({});
    const typography = ref<Record<string, Record<string, string>>>({});
    const spacing = ref<Record<string, string>>({});
    const padding = ref<Record<string, string>>({});
    const radius = ref<Record<string, string>>({});
    const button = ref<Record<string, string>>({});
    const input = ref<Record<string, string>>({});
    const background = ref<Record<string, string>>({});
    const font = ref<Record<string, string>>({});
    const trade = ref<Record<string, string>>({});
    const table = ref<Record<string, string>>({});
    const popup = ref<Record<string, string>>({});
    const nav = ref<Record<string, string>>({});
    const sidebar = ref<Record<string, string>>({});

    const activeTab = ref('colors');
    const isDark = ref(false);

    const loadTokens = () => {
      try {
        const colorTokens = getColorTokens();
        const typographyTokens = getTypographyTokens();
        const spacingTokens = getSpacingTokens();
        const paddingTokens = getPaddingTokens();
        const radiusTokens = getRadiusTokens();
        const buttonTokens = getButtonTokens();
        const inputTokens = getInputTokens();
        const backgroundTokens = getBackgroundTokens();
        const fontTokens = getFontTokens();
        const tradeTokens = getTradeTokens();
        const tableTokens = getTableTokens();
        const popupTokens = getPopupTokens();
        const navTokens = getNavTokens();
        const sidebarTokens = getSidebarTokens();

        colors.value = colorTokens;
        typography.value = typographyTokens;
        spacing.value = spacingTokens;
        padding.value = paddingTokens;
        radius.value = radiusTokens;
        button.value = buttonTokens;
        input.value = inputTokens;
        background.value = backgroundTokens;
        font.value = fontTokens;
        trade.value = tradeTokens;
        table.value = tableTokens;
        popup.value = popupTokens;
        nav.value = navTokens;
        sidebar.value = sidebarTokens;
      } catch (error) {
        console.error('Error loading tokens:', error);
        // 폴백 데이터는 기존과 동일하게 유지
        colors.value = {
          primary: {
            'primary-500': '#ffc300',
            'primary-600': '#ffaa00',
            'primary-700': '#ff8c00',
          },
          neutral: {
            'neutral-100': '#f5f6f6',
            'neutral-200': '#ecedee',
            'neutral-300': '#caccce',
            'neutral-800': '#131313',
          },
        };
        typography.value = {
          fontSize: {
            xs: '0.625rem',
            sm: '0.75rem',
            base: '0.812rem',
            lg: '1rem',
          },
          lineHeight: {
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.75',
          },
        };
        spacing.value = {
          'spacing-1': '0.25rem',
          'spacing-2': '0.5rem',
          'spacing-4': '1rem',
          'spacing-8': '2rem',
        };
        padding.value = {
          'padding-1': '0.25rem',
          'padding-2': '0.5rem',
          'padding-4': '1rem',
          'padding-8': '2rem',
        };
        radius.value = {
          'radius-sm': '0.125rem',
          'radius-md': '0.375rem',
          'radius-lg': '0.5rem',
          'radius-xl': '0.75rem',
        };
      }
    };

    // 그룹명을 대문자로 변환하는 함수
    const formatGroupName = (name: string) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    // 테마 토글 함수
    const toggleTheme = () => {
      isDark.value = !isDark.value;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
      }
      // CSS 변수가 적용될 시간을 주기 위해 더 긴 지연
      setTimeout(loadTokens, 100);
    };

    // 테마 변경 시 토큰 다시 로드
    watch(isDark, () => {
      // CSS 변수가 적용될 시간을 주기 위해 더 긴 지연
      setTimeout(loadTokens, 100);
    });

    // 전역 테마 변경 감시 (상단 메뉴에서 테마 변경 시)
    const watchGlobalTheme = () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            const newTheme = document.documentElement.getAttribute('data-theme');
            const newIsDark = newTheme === 'dark';
            if (isDark.value !== newIsDark) {
              isDark.value = newIsDark;
              setTimeout(loadTokens, 100);
            }
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      return observer;
    };

    onMounted(() => {
      // 초기 테마 설정
      if (typeof document !== 'undefined') {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        isDark.value = currentTheme === 'dark';

        // data-theme이 설정되지 않은 경우 기본값으로 'light' 설정
        if (!currentTheme) {
          document.documentElement.setAttribute('data-theme', 'light');
          isDark.value = false;
        }
      }

      // 전역 테마 변경 감시 시작
      const themeObserver = watchGlobalTheme();

      // CSS 변수가 적용될 시간을 주기 위해 약간의 지연
      setTimeout(() => {
        loadTokens();
      }, 50);

      // 컴포넌트 언마운트 시 observer 정리
      onUnmounted(() => {
        if (themeObserver) {
          themeObserver.disconnect();
        }
      });
    });

    const theme = computed(() => (isDark.value ? 'dark' : 'light'));

    return {
      colors,
      typography,
      spacing,
      padding,
      radius,
      button,
      input,
      background,
      font,
      trade,
      table,
      popup,
      nav,
      sidebar,
      activeTab,
      theme,
      toggleTheme,
      formatGroupName,
    };
  },
  template: `
    <div class="design-tokens-container">
      <div class="theme-toggle-bar">
        <button
          class="theme-switch"
          :aria-checked="theme === 'dark'"
          role="switch"
          :title="theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'"
          @click="toggleTheme"
        >
          <div class="theme-switch-track">
            <div class="theme-switch-thumb" :class="{ 'theme-switch-thumb-dark': theme === 'dark' }">
              <span class="theme-switch-icon" v-if="theme === 'light'">☀️</span>
              <span class="theme-switch-icon" v-else>🌙</span>
            </div>
          </div>
        </button>
      </div>
      <div class="tabs">
        <button
          :class="{ active: activeTab === 'colors' }"
          @click="activeTab = 'colors'"
        >
          Colors
        </button>
        <button
          :class="{ active: activeTab === 'typography' }"
          @click="activeTab = 'typography'"
        >
          Typography
        </button>
        <button
          :class="{ active: activeTab === 'spacing' }"
          @click="activeTab = 'spacing'"
        >
          Spacing
        </button>
        <button
          :class="{ active: activeTab === 'padding' }"
          @click="activeTab = 'padding'"
        >
          Padding
        </button>
        <button
          :class="{ active: activeTab === 'radius' }"
          @click="activeTab = 'radius'"
        >
          Radius
        </button>
        <button
          :class="{ active: activeTab === 'button' }"
          @click="activeTab = 'button'"
        >
          Button
        </button>
        <button
          :class="{ active: activeTab === 'input' }"
          @click="activeTab = 'input'"
        >
          Input
        </button>
        <button
          :class="{ active: activeTab === 'background' }"
          @click="activeTab = 'background'"
        >
          Background
        </button>
        <button
          :class="{ active: activeTab === 'font' }"
          @click="activeTab = 'font'"
        >
          Font
        </button>
        <button
          :class="{ active: activeTab === 'trade' }"
          @click="activeTab = 'trade'"
        >
          Trade
        </button>
        <button
          :class="{ active: activeTab === 'table' }"
          @click="activeTab = 'table'"
        >
          Table
        </button>
        <button
          :class="{ active: activeTab === 'popup' }"
          @click="activeTab = 'popup'"
        >
          Popup
        </button>
        <button
          :class="{ active: activeTab === 'nav' }"
          @click="activeTab = 'nav'"
        >
          Nav
        </button>
        <button
          :class="{ active: activeTab === 'sidebar' }"
          @click="activeTab = 'sidebar'"
        >
          Sidebar
        </button>
      </div>
      <div class="content">
        <!-- 색상 토큰 -->
        <div v-if="activeTab === 'colors'" class="colors-section">
          <div v-for="(colorGroup, groupName) in colors" :key="groupName" class="color-group">
            <h3>{{ formatGroupName(groupName) }}</h3>
            <div class="color-grid">
              <ColorToken
                v-for="(colorValue, colorName) in colorGroup"
                :key="colorName"
                :color-name="colorName"
                :color-value="colorValue"
              />
            </div>
          </div>
        </div>
        <!-- 타이포그래피 토큰 -->
        <div v-if="activeTab === 'typography'" class="typography-section">
          <div v-for="(typeGroup, typeName) in typography" :key="typeName" class="typography-group">
            <h3>{{ typeName === 'fontSize' ? 'Font Size' : typeName === 'lineHeight' ? 'Line Height' : 'Letter Spacing' }}</h3>
            <div class="typography-grid">
              <TypographyToken
                v-for="(tokenValue, tokenName) in typeGroup"
                :key="tokenName"
                :token-name="tokenName"
                :token-value="tokenValue"
                :token-type="typeName"
              />
            </div>
          </div>
        </div>
        <!-- 간격 토큰 -->
        <div v-if="activeTab === 'spacing'" class="size-section">
          <h3>Spacing</h3>
          <div class="size-grid">
            <SpacingToken
              v-for="(tokenValue, tokenName) in spacing"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
            />
          </div>
        </div>
        <!-- 패딩 토큰 -->
        <div v-if="activeTab === 'padding'" class="size-section">
          <h3>Padding</h3>
          <div class="size-grid">
            <PaddingToken
              v-for="(tokenValue, tokenName) in padding"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
            />
          </div>
        </div>
        <!-- 라운드 토큰 -->
        <div v-if="activeTab === 'radius'" class="size-section">
          <h3>Radius</h3>
          <div class="size-grid">
            <RadiusToken
              v-for="(tokenValue, tokenName) in radius"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
            />
          </div>
        </div>
        <!-- 버튼 토큰 -->
        <div v-if="activeTab === 'button'" class="component-section">
          <h3>Button Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in button"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="button"
            />
          </div>
        </div>
        <!-- 입력 토큰 -->
        <div v-if="activeTab === 'input'" class="component-section">
          <h3>Input Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in input"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="input"
            />
          </div>
        </div>
        <!-- 배경 토큰 -->
        <div v-if="activeTab === 'background'" class="component-section">
          <h3>Background Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in background"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="background"
            />
          </div>
        </div>
        <!-- 폰트 토큰 -->
        <div v-if="activeTab === 'font'" class="component-section">
          <h3>Font Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in font"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="font"
            />
          </div>
        </div>
        <!-- 거래 토큰 -->
        <div v-if="activeTab === 'trade'" class="component-section">
          <h3>Trade Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in trade"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="trade"
            />
          </div>
        </div>
        <!-- 테이블 토큰 -->
        <div v-if="activeTab === 'table'" class="component-section">
          <h3>Table Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in table"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="table"
            />
          </div>
        </div>
        <!-- 팝업 토큰 -->
        <div v-if="activeTab === 'popup'" class="component-section">
          <h3>Popup Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in popup"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="popup"
            />
          </div>
        </div>
        <!-- 네비게이션 토큰 -->
        <div v-if="activeTab === 'nav'" class="component-section">
          <h3>Navigation Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in nav"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="nav"
            />
          </div>
        </div>
        <!-- 사이드바 토큰 -->
        <div v-if="activeTab === 'sidebar'" class="component-section">
          <h3>Sidebar Tokens</h3>
          <div class="component-grid">
            <ComponentToken
              v-for="(tokenValue, tokenName) in sidebar"
              :key="tokenName"
              :token-name="tokenName"
              :token-value="tokenValue"
              token-type="sidebar"
            />
          </div>
        </div>
      </div>
    </div>
  `,
});

const meta: Meta<typeof DesignTokens> = {
  title: 'Foundations/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (story: any) => ({
      components: { story },
      template: '<story />',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
