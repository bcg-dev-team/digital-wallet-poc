<template>
  <div class="space-y-6 p-3">
    <!-- 업데이트 날짜 선택 -->
    <div class="space-y-2">
      <h3 class="text-base font-semibold text-[var(--font-color-default)]">
        개인정보처리방침 (필수)
      </h3>
      <div class="w-52">
        <BaseInputSelect v-model="selectedVersion" :options="versionOptions" class="w-full" />
      </div>
    </div>

    <!-- 개인정보처리방침 내용 -->
    <div class="max-h-[500px] space-y-6 overflow-y-auto">
      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제1조 (개인정보의 처리목적)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <p class="mb-2">
            MODA는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적
            이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에
            따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ol class="list-inside list-decimal space-y-1">
            <li>
              홈페이지 회원가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
              식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적
            </li>
            <li>
              재화 또는 서비스 제공: 물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공,
              맞춤서비스 제공 목적
            </li>
            <li>
              마케팅 및 광고에의 활용: 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적
              특성에 따른 서비스 제공 및 광고 게재 목적
            </li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제2조 (개인정보의 처리 및 보유기간)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>
              MODA는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </li>
            <li>
              각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>홈페이지 회원가입 및 관리: 회원 탈퇴 시까지</li>
                <li>재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제3조 (개인정보의 제3자 제공)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>
              MODA는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위 내에서만 처리하며,
              정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는
              경우에만 개인정보를 제3자에게 제공합니다.
            </li>
            <li>
              MODA는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>제공받는자: 배송업체</li>
                <li>제공목적: 상품 배송</li>
                <li>제공항목: 성명, 주소, 연락처</li>
                <li>보유 및 이용기간: 배송완료시까지</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-semibold text-[var(--font-color-default)]">
          제4조 (정보주체의 권리·의무 및 행사방법)
        </h4>
        <div class="text-sm leading-6 text-[var(--font-color-default)]">
          <ol class="list-inside list-decimal space-y-1">
            <li>
              정보주체는 MODA에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다.
              <ul class="ml-4 mt-1 list-inside list-disc space-y-1">
                <li>개인정보 처리정지 요구</li>
                <li>개인정보 열람요구</li>
                <li>개인정보 정정·삭제요구</li>
                <li>개인정보 처리정지 요구</li>
              </ul>
            </li>
            <li>
              제1항에 따른 권리 행사는 MODA에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여
              하실 수 있으며 MODA는 이에 대해 지체없이 조치하겠습니다.
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
