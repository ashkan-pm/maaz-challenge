<script setup lang="ts">
withDefaults(defineProps<{ as?: 'div' | 'section' | 'form' }>(), { as: 'div' })
</script>

<template>
  <component :is="as" class="card"><slot /></component>
</template>

<style scoped lang="scss">
:where(.card) {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}
</style>
