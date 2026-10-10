<script setup lang="ts">
import SiteFooter from '~/components/layout/footer/SiteFooter.vue'
import SiteHeader from '~/components/layout/header/SiteHeader.vue'
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <main class="site-content container">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.site-layout {
  display: flex;
  flex-direction: column;
  min-block-size: 100dvh;
}

.site-content {
  flex: 1;
  padding-block: var(--space-6) var(--space-10);
}
</style>
