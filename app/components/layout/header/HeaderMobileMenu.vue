<script setup lang="ts">
import HeaderNavigationLinks from '~/components/layout/header/HeaderNavigationLinks.vue'
import type { NavigationItem } from '~/types/navigation'

defineProps<{ items: readonly NavigationItem[] }>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <nav id="mobile-navigation" class="mobile-navigation container" aria-label="منوی موبایل">
    <HeaderNavigationLinks :items="items" mobile @select="emit('select')" />
  </nav>
</template>

<style scoped lang="scss">
.mobile-navigation {
  position: absolute;
  inset-block-start: calc(100% + var(--space-6));
  inset-inline: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
}

@media (min-width: 64rem) {
  .mobile-navigation {
    display: none;
  }
}
</style>
