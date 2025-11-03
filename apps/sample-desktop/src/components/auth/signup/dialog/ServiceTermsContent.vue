<template>
  <div class="space-y-6 p-3">
    <!-- 업데이트 날짜 선택 -->
    <div class="space-y-2">
      <h3 class="text-base font-semibold text-[var(--font-color-default)]">
        서비스 이용약관 (필수)
      </h3>
      <div class="w-52">
        <BaseInputSelect v-model="selectedVersion" :options="versionOptions" class="w-full" />
      </div>
    </div>

    <!-- 약관 내용 -->
    <div class="max-h-[500px] space-y-6 overflow-y-auto">
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">제1조 (목적)</h4>
        <p class="text-sm leading-6 text-[var(--font-color-default)]">
          이 약관은 MODA(이하 "회사")가 제공하는 모든 서비스의 이용과 관련하여 회사와 회원 간의
          권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </p>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">제2조 (정의)</h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>"서비스"란 회사가 제공하는 모든 서비스를 의미합니다.</li>
            <li>
              "회원"이란 회사의 서비스에 접속하여 이 약관에 따라 회사와 이용계약을 체결하고 회사가
              제공하는 서비스를 이용하는 고객을 말합니다.
            </li>
            <li>
              "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와
              숫자의 조합을 의미합니다.
            </li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제3조 (약관의 효력 및 변경)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>이 약관은 서비스를 통해 공지함으로써 효력이 발생합니다.</li>
            <li>
              회사는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 서비스를
              통해 공지합니다.
            </li>
            <li>회원은 변경된 약관에 동의하지 않을 경우 회원탈퇴를 요청할 수 있습니다.</li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제4조 (서비스의 제공 및 변경)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>
              회사는 다음과 같은 업무를 수행합니다.
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
                <li>구매계약이 체결된 재화 또는 용역의 배송</li>
                <li>기타 회사가 정하는 업무</li>
              </ul>
            </li>
            <li>
              회사는 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는
              계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다.
            </li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제5조 (서비스의 중단)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>
              회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한
              경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
            </li>
            <li>
              회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가
              입은 손해에 대하여 배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는
              그러하지 아니합니다.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseInputSelect } from '@template/ui';
import { ref } from 'vue';

// 선택된 약관 버전
const selectedVersion = ref('2025.07.20');

// BaseInputSelect용 옵션 데이터
const versionOptions = [
  { value: '2025.07.20', label: '최근 업데이트: 2025.07.20' },
  { value: '2025.06.15', label: '이전 버전: 2025.06.15' },
  { value: '2025.05.10', label: '이전 버전: 2025.05.10' },
];
</script>
