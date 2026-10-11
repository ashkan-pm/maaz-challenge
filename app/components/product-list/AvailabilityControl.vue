<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import Toggle from '~/components/ui/Toggle.vue'
const available = defineModel<boolean>({ default: false })
</script>

<template>
  <Card class="availability-control">
    <h2>محصولات موجود</h2>
    <Toggle v-model="available" label="فقط محصولات موجود" />
  </Card>
</template>

<style scoped lang="scss">
.availability-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-block-size: var(--space-12);
  padding: var(--space-2) var(--space-4);
}

h2 {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
}
</style>
