<script setup lang="ts">
import FooterLinkSection from '~/components/layout/footer/FooterLinkSection.vue'
import type { IconName } from '~/types/icon'

const quickLinks = ['درباره ما', 'بلاگ', 'تماس با ما', 'خدمات پس از فروش'].map((label) => ({
  label
}))
const guideLinks = ['قوانین و مقررات', 'دریافت مشاوره', 'انتقادات و پیشنهادات'].map((label) => ({
  label
}))
const socialLinks = [
  { label: 'تلگرام', icon: 'telegram' },
  { label: 'اینستاگرام', icon: 'instagram' },
  { label: 'لینکدین', icon: 'linkedin' }
] as const satisfies readonly { label: string; icon: IconName }[]
</script>

<template>
  <div class="footer-links container">
    <div class="support">
      <p>هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم</p>
    </div>
    <FooterLinkSection id="quick-links-title" title="دسترسی سریع" :items="quickLinks" />
    <FooterLinkSection id="guide-links-title" title="راهنمای سایت" :items="guideLinks" />
    <FooterLinkSection
      id="social-links-title"
      class="social-section"
      title="شبکه‌های اجتماعی"
      :items="socialLinks"
      social
    />
  </div>
</template>

<style scoped lang="scss">
.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-16) var(--space-4);
  padding-block: 9.9375rem var(--space-12);
  padding-inline: var(--space-5);
}

.footer-links > nav {
  flex: 1 1 calc(50% - var(--space-2));
}

.footer-links > .social-section {
  flex-basis: 100%;
}

.support {
  display: none;
}

@media (max-width: 22rem) {
  .footer-links {
    padding-inline: 0;
  }
}

@media (min-width: 64rem) {
  .footer-links {
    flex-wrap: nowrap;
    gap: var(--space-6);
    min-block-size: 16.5rem;
    padding-block: var(--space-10) 2.75rem;
    padding-inline: 0;
  }

  .footer-links > nav {
    flex: 1;
  }

  .footer-links > .social-section {
    flex: 0.9;
  }

  .support {
    display: flex;
    flex: 1.4;
    align-items: flex-end;
    padding-block-end: var(--space-3);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
}
</style>
