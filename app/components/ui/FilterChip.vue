<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { FilterChipIconName } from '~/types/icon'

defineProps<{ label: string; icon: FilterChipIconName }>()
</script>

<template>
  <span class="filter-chip">
    <AppIcon :name="icon" />
    <span class="chip-label">{{ label }}</span>
    <button type="button" class="remove-button" :aria-label="`حذف فیلتر: ${label}`">
      <AppIcon name="close" />
    </button>
  </span>
</template>

<style scoped lang="scss">
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  max-inline-size: 100%;
  padding: var(--space-1) var(--space-2) var(--space-1) var(--space-3);
  border-radius: var(--radius-lg);
  background: #fce6ef;
  color: var(--color-heading);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
}

.chip-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.remove-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: var(--space-6);
  block-size: var(--space-6);
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  transition: color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    color: var(--color-primary);
  }

  @media (hover: hover) {
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
