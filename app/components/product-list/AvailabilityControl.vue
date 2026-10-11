<script setup lang="ts">
import Toggle from '~/components/ui/Toggle.vue'
</script>

<template>
  <div class="availability-control">
    <h2>محصولات موجود</h2>
    <Toggle label="فقط محصولات موجود" />
  </div>
</template>

<style scoped lang="scss">
.availability-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-block-size: var(--space-12);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

h2 {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
}
</style>
