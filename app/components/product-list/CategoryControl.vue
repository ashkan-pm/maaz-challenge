<script setup lang="ts">
import Accordion from '~/components/ui/Accordion.vue'
import Badge from '~/components/ui/Badge.vue'
import Checkbox from '~/components/ui/Checkbox.vue'

import type { ProductCategory } from '~/types/productCategory'

defineProps<{ options: readonly ProductCategory[] }>()
const selected = defineModel<string[]>({ default: () => [] })

function toggleCategory(value: string, checked: boolean) {
  selected.value = checked
    ? [...new Set([...selected.value, value])]
    : selected.value.filter((category) => category !== value)
}
</script>

<template>
  <Accordion title="دسته بندی" default-open="desktop">
    <div class="category-options" role="group" aria-label="دسته بندی محصولات">
      <Checkbox
        v-for="category in options"
        :key="category.value"
        :model-value="selected.includes(category.value)"
        :label="category.label"
        @update:model-value="toggleCategory(category.value, $event)"
      >
        <Badge :count="category.count" :active="selected.includes(category.value)" />
      </Checkbox>
    </div>
  </Accordion>
</template>

<style scoped lang="scss">
.category-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
