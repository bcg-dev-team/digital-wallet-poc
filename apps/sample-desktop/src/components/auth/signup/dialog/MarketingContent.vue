<template>
  <div class="space-y-6 p-3">
    <!-- 업데이트 날짜 선택 -->
    <div class="space-y-2">
      <h3 class="text-base font-semibold text-[var(--font-color-default)]">
        마케팅 수신동의 (선택)
      </h3>
      <div class="w-52">
        <BaseInputSelect v-model="selectedVersion" :options="versionOptions" class="w-full" />
      </div>
    </div>

    <!-- 마케팅 수신동의 내용 -->
    <div class="max-h-[500px] space-y-6 overflow-y-auto">
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제1조 (마케팅 정보 수신 동의)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <p class="mb-2">
            MODA는 고객님께 다양한 혜택과 서비스 정보를 제공하기 위해 마케팅 정보 수신에 대한 동의를
            요청드립니다.
          </p>
          <ol class="list-inside list-decimal space-y-1">
            <li>수집·이용 목적: 신상품 소식, 이벤트 정보, 할인 혜택 등 마케팅 정보 제공</li>
            <li>수집 항목: 이름, 이메일 주소, 휴대폰 번호</li>
            <li>보유 및 이용기간: 동의 철회 시 또는 회원 탈퇴 시까지</li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제2조 (마케팅 정보 제공 방법)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <p class="mb-2">마케팅 정보는 다음의 방법으로 제공됩니다:</p>
          <ol class="list-inside list-decimal space-y-1">
            <li>이메일을 통한 뉴스레터 및 프로모션 정보 발송</li>
            <li>SMS/MMS를 통한 할인 쿠폰 및 이벤트 정보 발송</li>
            <li>앱 푸시 알림을 통한 실시간 혜택 정보 제공</li>
            <li>우편을 통한 카탈로그 및 특별 혜택 정보 발송</li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">제3조 (동의 철회)</h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>마케팅 정보 수신에 대한 동의는 언제든지 철회하실 수 있습니다.</li>
            <li>
              동의 철회 방법:
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>웹사이트 마이페이지에서 직접 설정 변경</li>
                <li>이메일 하단의 '수신거부' 링크 클릭</li>
                <li>고객센터 전화(1588-0000) 또는 이메일(help@moda.com) 문의</li>
                <li>SMS 수신거부 문자 발송</li>
              </ul>
            </li>
            <li>동의를 철회하시더라도 서비스 이용에는 제한이 없습니다.</li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제4조 (개인정보 제3자 제공)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>마케팅 목적으로 수집된 개인정보는 원칙적으로 제3자에게 제공하지 않습니다.</li>
            <li>
              다만, 다음의 경우에는 예외로 합니다:
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>고객님의 별도 동의가 있는 경우</li>
                <li>법령에 의해 요구되는 경우</li>
                <li>제휴사와의 공동 마케팅을 위해 필요한 경우 (사전 고지 후 진행)</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div class="rounded-md border border-yellow-200 bg-yellow-50 p-4">
        <div class="flex">
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">선택사항 안내</h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>
                마케팅 수신동의는 선택사항으로, 동의하지 않으셔도 서비스 이용에는 전혀 제한이
                없습니다. 다만, 다양한 혜택과 이벤트 정보를 받아보실 수 없습니다.
              </p>
            </div>
          </div>
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
