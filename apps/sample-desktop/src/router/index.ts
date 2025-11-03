import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import LocalStorageService from '@/services/localStorage/local-storage.service';
import { createRouter, createWebHistory, HistoryState } from 'vue-router';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import MainLayout from '@/components/layout/MainLayout.vue';
import { useToastStore } from '@/stores/useToastStore';

// 커스텀 메타 타입 정의
interface CustomRouteMeta {
  layout?: typeof MainLayout;
  auth?: boolean;
  footer?: boolean; // footer 표시 여부 (기본값: true)
}

// 라우트 타입을 커스텀 메타로 확장
type CustomRouteRecordRaw = RouteRecordRaw & {
  meta?: CustomRouteMeta;
  children?: CustomRouteRecordRaw[];
};

const routes: CustomRouteRecordRaw[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/login/Index.vue'),
      },

      {
        path: 'sign-up',
        children: [
          {
            path: '',
            name: 'sign-up',
            component: () => import('@/views/auth/signup/Index.vue'),
          },
          {
            path: 'individual',
            name: 'individual-sign-up',
            component: () => import('@/views/auth/signup/individual/Index.vue'),
          },
          {
            path: 'corporate',
            name: 'corporate-sign-up',
            component: () => import('@/views/auth/signup/corporate/Index.vue'),
          },
          {
            path: 'complete',
            name: 'sign-up-complete',
            component: () => import('@/views/auth/signup/complete/Index.vue'),
          },
        ],
      },
      {
        path: 'find-id',
        name: 'find-id',
        component: () => import('@/views/auth/findId/Index.vue'),
      },
      {
        path: 'reset-password',
        children: [
          {
            path: '',
            name: 'reset-password',
            component: () => import('@/views/auth/resetPassword/Index.vue'),
          },
          {
            path: 'complete',
            name: 'reset-password-complete',
            component: () => import('@/views/auth/resetPassword/complete/Index.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: MainLayout },
    component: () => import('@/views/home/Index.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: { layout: MainLayout, footer: false },
    component: () => import('@/views/order/Index.vue'),
  },
  {
    path: '/transaction/:transactionTab?',
    name: 'transaction',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/transaction/Index.vue'),
  },
  {
    path: '/assets',
    name: 'assets',
    meta: { layout: MainLayout },
    component: () => import('@/views/assets/Index.vue'),
  },
  {
    path: '/accounts/:accountManagementTab?',
    name: 'account-management',
    meta: { layout: MainLayout },
    component: () => import('@/views/accountManagement/Index.vue'),
  },
  {
    path: '/support/:supportTab?',
    name: 'support',
    meta: { layout: MainLayout },
    component: () => import('@/views/support/Index.vue'),
  },
  {
    path: '/mypage',
    name: 'mypage',
    meta: { layout: MainLayout },
    component: () => import('@/views/myPage/Index.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacy-policy',
    meta: { layout: MainLayout },
    component: () => import('@/views/privacyPolicy/Index.vue'),
  },
  {
    path: '/investment-warning',
    name: 'investment-warning',
    meta: { layout: MainLayout },
    component: () => import('@/views/investWarning/Index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: { layout: MainLayout },
    component: () => import('@/views/about/Index.vue'),
  },
  {
    path: '/markup',
    name: 'markup',
    component: () => import('@/views/markup/Index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

/**
 * 네비게이션 가드
 * 인증 및 리다이렉트 규칙을 처리합니다.
 */
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 인증이 필요한 페이지인지 확인
    if (to.meta?.auth) {
      const token = LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN);
      if (!token || Object.keys(token).length === 0) {
        // FIXME: 임시 처리로, 추후 개선 필요
        const toastStore = useToastStore();
        toastStore.addToast('로그인 후 이용해주세요.', 3000);
        return next({ name: 'login' });
      }
    }

    next();
  }
);

export default router;
