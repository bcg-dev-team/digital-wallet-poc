<!--
  @fileoverview 차트 설정 다이얼로그 컴포넌트
  @component ChartSettingsDialog
  @figma 차트 설정 다이얼로그
  FIXME: 피그마 확인하여 추가 수정
-->
<template>
  <BaseModal
    :is-open="isVisible"
    title="설정"
    size="lg"
    :close-on-overlay-click="true"
    :close-on-escape="true"
    :show-close-button="true"
    :show-default-footer="false"
    content-padding="compact"
    @close="handleClose"
  >
    <!-- 메인 컨텐츠 -->
    <div class="settings-main">
      <!-- 좌측 탭 네비게이션 -->
      <div class="settings-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-button', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 우측 설정 패널 -->
      <div class="settings-content">
        <!-- 기본 탭 -->
        <div v-if="activeTab === 'basic'" class="settings-panel flex flex-col gap-9">
          <div class="setting-section">
            <h3 class="section-title">기본</h3>

            <div class="setting-group">
              <!-- 테마 설정 -->
              <div class="setting-item">
                <label class="setting-label">테마</label>
                <div class="theme-selector">
                  <button
                    :class="['theme-option', { selected: settings.basic.theme === 'redBlue' }]"
                    @click="updateSetting('basic.theme', 'redBlue')"
                  >
                    <div class="theme-preview redBlue">
                      <BaseIcon name="candle-redblue" size="lg" />
                    </div>
                    <BaseIcon
                      v-if="settings.basic.theme === 'redBlue'"
                      name="check-sm"
                      size="sm"
                      color="var(--background-bg-default)"
                      class="theme-check"
                    />
                  </button>
                  <button
                    :class="['theme-option', { selected: settings.basic.theme === 'greenRed' }]"
                    @click="updateSetting('basic.theme', 'greenRed')"
                  >
                    <div class="theme-preview greenRed">
                      <BaseIcon name="candle-greenred" size="lg" />
                    </div>
                    <BaseIcon
                      v-if="settings.basic.theme === 'greenRed'"
                      name="check-sm"
                      size="sm"
                      color="var(--background-bg-default)"
                      class="theme-check"
                    />
                  </button>
                </div>
              </div>

              <!-- 가격 정밀도 -->
              <div class="setting-item">
                <label class="setting-label">가격 정밀도</label>
                <BaseInputSelect
                  v-model="settings.basic.precision"
                  :options="precisionOptions"
                  class="w-full"
                  @update:modelValue="applySettings"
                />
              </div>

              <!-- 타임존 -->
              <div class="setting-item">
                <label class="setting-label">타임존</label>
                <BaseInputSelect
                  v-model="settings.basic.timezone"
                  :options="timezoneOptions"
                  class="w-full"
                  @update:modelValue="applySettings"
                />
              </div>
            </div>
          </div>
          <div class="setting-section">
            <h3 class="section-title">심볼 및 지표</h3>

            <div class="setting-group">
              <!-- 종목명, 차트값, 봉변화값 설정 제거됨 -->

              <!-- 지표 관련 설정 - 새로운 레이아웃 -->
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorNames"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">지표 이름</label>
              </div>

              <div class="setting-item checkbox-item indicator-sub-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorArguments"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">매개변수</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.symbols.showIndicatorValues"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">지표 값</label>
              </div>
            </div>
          </div>
          <div class="setting-section">
            <h3 class="section-title">축 및 눈금선</h3>

            <div class="setting-group">
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.scales.showPriceLabels"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">종목 가격</label>
              </div>

              <div class="setting-item complex-item">
                <BaseCheckbox
                  v-model="settings.scales.showGridLines"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">격자선</label>
                <div>
                  <BaseInputSelect
                    v-model="settings.scales.gridLineMode"
                    :options="gridLineModeOptions"
                    size="sm"
                    @update:modelValue="applySettings"
                    :disabled="!settings.scales.showGridLines"
                  />
                </div>
                <!-- 수직 격자선 색상 (수직 또는 둘다 모드일 때만 표시) -->
                <ColorPicker
                  v-if="
                    settings.scales.gridLineMode === 'vertical' ||
                    settings.scales.gridLineMode === 'both'
                  "
                  v-model="settings.scales.verticalGridColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showGridLines"
                  title="수직 격자선 색상"
                />
                <!-- 수평 격자선 색상 (수평 또는 둘다 모드일 때만 표시) -->
                <ColorPicker
                  v-if="
                    settings.scales.gridLineMode === 'horizontal' ||
                    settings.scales.gridLineMode === 'both'
                  "
                  v-model="settings.scales.horizontalGridColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showGridLines"
                  title="수평 격자선 색상"
                />
              </div>

              <div class="setting-item complex-item">
                <BaseCheckbox
                  v-model="settings.scales.showCrosshair"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">십자선</label>
                <ColorPicker
                  v-model="settings.scales.crosshairColor"
                  @change="applySettings"
                  :disabled="!settings.scales.showCrosshair"
                  title="십자선 색상"
                />
              </div>
            </div>
          </div>
          <div class="setting-section">
            <h3 class="section-title">트레이딩</h3>

            <div class="setting-group">
              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.showBuySellButtons"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">매수/매도 버튼</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.instantOrderExecution"
                  @update:modelValue="applySettings"
                  disabled
                />
                <label class="checkbox-label">즉시 주문 실행</label>
              </div>

              <div class="setting-item checkbox-item">
                <BaseCheckbox
                  v-model="settings.trading.showOrders"
                  @update:modelValue="applySettings"
                />
                <label class="checkbox-label">주문</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { getGlobalChartSettingsInstance } from '../../composables/useGlobalChartSettings';
import { BaseIcon, BaseCheckbox, BaseModal, BaseInputSelect } from '@template/ui';
import type { ChartSettings } from '@template/types';
import ColorPicker from './ColorPicker.vue';
import './ChartSettingsDialog.scss';
import { ref } from 'vue';

interface Props {
  /**
   * 다이얼로그 표시 여부
   */
  isVisible: boolean;
  /**
   * 차트 매니저 인스턴스
   */
  chartManager?: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  /**
   * 다이얼로그 닫기
   */
  close: [];
  /**
   * 설정 변경 시 발생
   * @param settings - 변경된 차트 설정
   */
  settingsChanged: [settings: ChartSettings];
}>();

// 글로벌 차트 설정 인스턴스
const globalChartSettings = getGlobalChartSettingsInstance();
// 복사본을 사용하여 변경 감지 가능하게 함
const settings = ref<ChartSettings>(globalChartSettings.getGlobalChartSettings());

// 활성 탭
const activeTab = ref('basic');

// 탭 정의
const tabs = [{ id: 'basic', label: '기본 설정' }];

// 설정 업데이트 헬퍼 함수
const updateSetting = (path: string, value: any) => {
  const keys = path.split('.');
  let target: any = settings.value;

  for (let i = 0; i < keys.length - 1; i++) {
    target = target[keys[i]];
  }

  const oldValue = target[keys[keys.length - 1]];
  target[keys[keys.length - 1]] = value;

  console.log(`[ChartSettingsDialog] Setting updated: ${path}`, {
    from: oldValue,
    to: value,
  });

  applySettings();
};

// 설정 적용
const applySettings = () => {
  try {
    console.log('[ChartSettingsDialog] === SETTINGS CHANGE STARTED ===');
    console.log('[ChartSettingsDialog] 🔍 CHECKBOX VALUES CHECK:', {
      symbols: {
        showIndicatorNames: settings.value.symbols.showIndicatorNames,
        showIndicatorArguments: settings.value.symbols.showIndicatorArguments,
        showIndicatorValues: settings.value.symbols.showIndicatorValues,
      },
      scales: {
        showPriceLabels: settings.value.scales.showPriceLabels,
        showGridLines: settings.value.scales.showGridLines,
        gridLineMode: settings.value.scales.gridLineMode,
        showCrosshair: settings.value.scales.showCrosshair,
        crosshairColor: settings.value.scales.crosshairColor,
      },
    });

    // 글로벌 설정을 모든 차트에 적용
    globalChartSettings.updateGlobalChartSettings(settings.value);

    // 이벤트 발생
    emit('settingsChanged', settings.value);

    console.log('[ChartSettingsDialog] === SETTINGS CHANGE COMPLETED ===');
  } catch (error) {
    console.error('[ChartSettingsDialog] Failed to apply global settings:', error);
  }
};

const precisionOptions = [
  { value: 'default', label: '기본' },
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

const timezoneOptions = [
  { value: 'Asia/Seoul', label: '(UTC +09:00) 서울(KST)' },
  { value: 'UTC', label: '(UTC +00:00) UTC' },
  { value: 'America/New_York', label: '(UTC -05:00) 뉴욕(EST)' },
  { value: 'Europe/London', label: '(UTC +00:00) 런던(GMT)' },
];

const gridLineModeOptions = [
  { value: 'both', label: '수직 / 수평' },
  { value: 'vertical', label: '수직' },
  { value: 'horizontal', label: '수평' },
];

// 다이얼로그 닫기
const handleClose = () => {
  emit('close');
};
</script>
