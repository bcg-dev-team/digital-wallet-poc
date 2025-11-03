<template>
  <footer class="bg-bg-bg-surface min-w-[1920px] pb-[64px] pt-[36px]">
    <div class="text-text-footer mx-auto flex w-[1920px] flex-col items-center justify-center">
      <div class="mb-[16px] flex items-center gap-[16px] text-sm">
        <template v-for="(link, index) in footerLinks" :key="link.id">
          <a
            :href="link.href"
            class="font-regular text-footer"
            :class="{ '!text-default !font-medium': index === footerLinks.length - 1 }"
            >{{ link.text }}</a
          >
          <span v-if="index < footerLinks.length - 1" class="separator text-footer">|</span>
        </template>
      </div>
      <p class="text-footer text-sm">Copyright&copy;2025 MODA Co.Ltd. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  id: string;
  text: string;
  href: string;
}

const footerLinks: FooterLink[] = [
  { id: 'company', text: '회사소개', href: '/about' },
  { id: 'notice', text: '공지사항', href: '/support/notice' },
  { id: 'faq', text: '자주묻는질문', href: '/support/faq' },
  { id: 'investment', text: '투자유의사항', href: 'investment-warning' },
  { id: 'customer', text: '고객센터 1588-1588', href: '#' },
  { id: 'privacy', text: '개인정보처리방침', href: '/privacy-policy' },
];
</script>
