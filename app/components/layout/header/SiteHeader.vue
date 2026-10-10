<script setup lang="ts">
import HeaderContactLink from '~/components/layout/header/HeaderContactLink.vue'
import HeaderDesktopNavigation from '~/components/layout/header/HeaderDesktopNavigation.vue'
import HeaderMobileNavigation from '~/components/layout/header/HeaderMobileNavigation.vue'
</script>

<template>
  <header class="site-header">
    <div class="toolbar container">
      <HeaderMobileNavigation />
      <span class="header-spacer" aria-hidden="true" />
      <HeaderDesktopNavigation />
      <HeaderContactLink />
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 10;
  border-end-start-radius: var(--radius-md);
  border-end-end-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: 0 2px 2px rgb(0 0 0 / 8%);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-block-size: 4.5rem;
}

.header-spacer {
  display: none;
}

@media (min-width: 64rem) {
  .toolbar {
    gap: var(--space-6);
    min-block-size: 7.5rem;
  }

  .header-spacer {
    display: block;
    flex: 0 0 105px;
  }
}
</style>
