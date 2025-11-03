<template>
  <div class="markup-page">
    <div class="container mx-auto px-6 py-8">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">마크업 페이지 목록</h1>

      <div class="overflow-hidden rounded-lg bg-white shadow">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                화면명
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                작업자
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                상태(1차 퍼블)
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                상태(최종)
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr
              v-for="page in markupPages"
              :key="page.id"
              @click="navigateToPage(page.route)"
              class="cursor-pointer transition-colors duration-200 hover:bg-gray-50"
            >
              <td class="whitespace-nowrap px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ page.name }}</div>
                <div class="text-sm text-gray-500">{{ page.description }}</div>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <div class="text-sm text-gray-900">{{ page.worker }}</div>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                  :class="getStatusClass(page.firstPublishStatus)"
                >
                  {{ page.firstPublishStatus }}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span
                  class="inline-flex rounded-full px-2 py-1 text-xs font-semibold"
                  :class="getStatusClass(page.finalStatus)"
                >
                  {{ page.finalStatus }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

/**
 * 마크업 페이지 목록을 표시하는 컴포넌트
 * 각 행을 클릭하면 해당 화면으로 이동할 수 있습니다.
 */
interface MarkupPage {
  id: string;
  name: string;
  description: string;
  worker: string;
  firstPublishStatus: string;
  finalStatus: string;
  route: string;
}

const router = useRouter();

const markupPages: MarkupPage[] = [
  {
    id: 'login',
    name: '로그인',
    description: '사용자 로그인 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/auth/login',
  },
  {
    id: 'individual-signup',
    name: '개인회원가입',
    description: '개인 사용자 회원가입 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/auth/sign-up/individual',
  },
  {
    id: 'corporate-signup',
    name: '법인회원가입',
    description: '법인 사용자 회원가입 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/auth/sign-up/corporate',
  },
  {
    id: 'home',
    name: '홈',
    description: '메인 홈페이지',
    worker: '박철진',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/',
  },
  {
    id: 'order',
    name: '주문',
    description: '주문 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/order',
  },
  {
    id: 'transaction',
    name: '거래',
    description: '거래 내역 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/transaction',
  },
  {
    id: 'assets',
    name: '자산',
    description: '자산 현황 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/assets',
  },
  {
    id: 'account-management',
    name: '계좌관리',
    description: '계좌 관리 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/accounts',
  },
  {
    id: 'service',
    name: '고객지원',
    description: '고객지원 페이지',
    worker: '박철진',
    firstPublishStatus: '완료',
    finalStatus: '대기',
    route: '/support',
  },
  {
    id: 'my-page',
    name: '마이페이지',
    description: '사용자 정보 페이지',
    worker: '박철진',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/mypage',
  },
  {
    id: 'chart',
    name: '차트',
    description: '실시간 차트 분석 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/chart',
  },
  {
    id: 'signup-main',
    name: '회원가입 메인',
    description: '회원가입 메인 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/auth/sign-up',
  },
  {
    id: 'signup-complete',
    name: '회원가입 완료',
    description: '회원가입 완료 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/auth/sign-up/complete',
  },
  {
    id: 'find-id',
    name: '아이디 찾기',
    description: '아이디 찾기 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/auth/find-id',
  },
  {
    id: 'reset-password',
    name: '비밀번호 재설정',
    description: '비밀번호 재설정 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/auth/reset-password',
  },
  {
    id: 'reset-password-complete',
    name: '비밀번호 재설정 완료',
    description: '비밀번호 재설정 완료 페이지',
    worker: '-',
    firstPublishStatus: '대기',
    finalStatus: '대기',
    route: '/auth/reset-password/complete',
  },
];

/**
 * 상태에 따른 CSS 클래스를 반환합니다.
 * @param status - 상태값
 * @returns 상태에 맞는 CSS 클래스
 */
const getStatusClass = (status: string): string => {
  switch (status) {
    case '완료':
      return 'bg-green-100 text-green-800';
    case '진행중':
      return 'bg-blue-100 text-blue-800';
    case '검토중':
      return 'bg-yellow-100 text-yellow-800';
    case '대기':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * 선택된 페이지로 이동합니다.
 * @param route - 이동할 라우트 경로
 */
const navigateToPage = (route: string): void => {
  router.push(route);
};
</script>

<style scoped>
.markup-page {
  min-height: 100vh;
  width: 100vw;
  background-color: #f9fafb;
  padding: 0;
  margin: 0;
}

.container {
  width: 100%;
  max-width: none;
  padding: 2rem;
}

/* 테이블 행 호버 효과 */
tbody tr:hover {
  background-color: #f9fafb;
}

/* 테이블 헤더 스타일 */
thead th {
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 상태 배지 스타일 */
.inline-flex {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* 전체 화면 테이블 */
table {
  width: 100%;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .markup-page h1 {
    font-size: 1.5rem;
  }
}
</style>
