<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 강도 표시 컴포넌트
-->
<template>
  <div class="base-password-strength">
    <!-- 비밀번호 강도 진행바 -->
    <BaseProgressBar
      variant="password-strength"
      :strength-score="strength.score"
      :show-label="showLabel"
      class="base-password-strength__progress"
    />

    <!-- 추가 정보 (선택사항) -->
    <div v-if="showDetails && strength.feedback.length > 0" class="base-password-strength__details">
      <div
        v-for="(feedback, index) in strength.feedback"
        :key="index"
        class="base-password-strength__feedback text-neutral600"
      >
        {{ feedback }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseProgressBar from '../BaseProgressBar/BaseProgressBar.vue';
import type { PasswordStrengthDisplay } from '@template/types';

interface Props {
  /** 비밀번호 강도 정보 */
  strength: PasswordStrengthDisplay;
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 상세 피드백 표시 여부 */
  showDetails?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showLabel: true,
  showDetails: false,
});
</script>
