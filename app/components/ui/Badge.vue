<script setup lang="ts">
import { formatFarsiNumber } from '~/utils/formatNumber'

const props = withDefaults(defineProps<{ count: number; active?: boolean }>(), { active: false })
const formattedCount = computed(() => formatFarsiNumber(props.count, { useGrouping: false }))
</script>

<template>
  <span class="badge" :class="{ 'is-active': active }">{{ formattedCount }}</span>
</template>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-inline-size: var(--space-6);
  block-size: var(--space-6);
  padding-inline: var(--space-1);
  border-radius: var(--radius-xs);
  background: var(--color-surface-dark);
  color: var(--color-surface);
  font-family: var(--font-family-content);
  font-size: var(--font-size-xs);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  transition: background-color var(--transition-duration) ease;

  &.is-active {
    background: var(--color-primary);
  }
}
</style>
