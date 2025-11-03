<template>
  <nav class="flex items-center gap-9">
    <router-link
      v-for="menu in navMenus"
      :key="menu.id"
      :to="{ name: menu.to }"
      class="decoration-none whitespace-nowrap text-lg font-semibold text-white"
      :class="{ '!text-primary': $route.name === menu.to }"
    >
      {{ menu.text }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
interface NavMenu {
  id: string;
  text: string;
  to: string;
}

const navMenus: NavMenu[] = [
  { id: 'home', text: '홈', to: 'home' },
  { id: 'order', text: '주문', to: 'order' },
  { id: 'trade', text: '거래', to: 'transaction' },
  { id: 'assets', text: '자산', to: 'assets' },
  { id: 'account-management', text: '계좌관리', to: 'account-management' },
  { id: 'support', text: '고객지원', to: 'support' },
];
</script>
