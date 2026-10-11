<script setup lang="ts">
import Accordion from '~/components/ui/Accordion.vue'
import Badge from '~/components/ui/Badge.vue'
import Checkbox from '~/components/ui/Checkbox.vue'

const categories = ref([
  { label: "Men's Clothing", count: 4, checked: true },
  { label: 'Jewelery', count: 4, checked: false },
  { label: 'Electronics', count: 6, checked: false },
  { label: "Women's Clothing", count: 4, checked: false }
])
</script>

<template>
  <Accordion title="دسته بندی" default-open="desktop">
    <div class="category-options" role="group" aria-label="دسته بندی محصولات">
      <Checkbox
        v-for="category in categories"
        :key="category.label"
        v-model="category.checked"
        :label="category.label"
      >
        <Badge :count="category.count" :active="category.checked" />
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
