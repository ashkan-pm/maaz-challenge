<script setup lang="ts">
import SiteHeader from '~/components/layout/SiteHeader.vue'
</script>

<template>
  <div class="site-layout">
    <a class="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
    <SiteHeader />
    <main id="main-content" class="site-content container" tabindex="-1">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  min-block-size: 100dvh;
}

.site-content {
  padding-block: var(--space-6) var(--space-10);
}

.skip-link {
  position: fixed;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-4);
  z-index: 1;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  transform: translateY(-200%);

  &:focus {
    transform: translateY(0);
  }
}
</style>
