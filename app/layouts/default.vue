<script setup lang="ts">
import SiteHeader from '~/components/layout/header/SiteHeader.vue'
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <main class="site-content container">
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
</style>
