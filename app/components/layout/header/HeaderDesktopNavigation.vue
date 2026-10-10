<script setup lang="ts">
import HeaderNavigationLinks from '~/components/layout/header/HeaderNavigationLinks.vue'
import { headerNavigation } from './navigation'
</script>

<template>
  <nav class="desktop-navigation" aria-label="منوی اصلی">
    <HeaderNavigationLinks :items="headerNavigation" />
  </nav>
</template>

<style scoped lang="scss">
.desktop-navigation {
  display: none;
}

@media (min-width: 64rem) {
  .desktop-navigation {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: var(--space-6);
  }
}
</style>
