<script setup lang="ts">
const props = withDefaults(defineProps<{ count: number; active?: boolean }>(), { active: false })
const formatter = new Intl.NumberFormat('fa-IR', { useGrouping: false })
const formattedCount = computed(() => formatter.format(props.count))
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
  background: #171b2a;
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
