<script setup lang="ts">
import Card from './Card.vue'

withDefaults(defineProps<{ as?: 'div' | 'section' }>(), { as: 'div' })
</script>

<template>
  <Card :as="as" class="state-card"><slot /></Card>
</template>

<style scoped lang="scss">
// Centered loading, empty, and error states; :where lets callers adjust spacing and color.
:where(.state-card) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  min-block-size: 20rem;
  text-align: center;
}

:slotted(:is(h1, h2)) {
  color: var(--color-heading);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

:slotted(p) {
  color: var(--color-text-muted);
}
</style>
