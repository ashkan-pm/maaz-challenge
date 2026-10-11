<script setup lang="ts">
import type { ProductSort } from '~/types/productSort'
import { DEFAULT_PRODUCT_SORT } from '~/utils/productSort'
import AvailabilityControl from './AvailabilityControl.vue'
import CategoryControl from './CategoryControl.vue'
import SortControl from './SortControl.vue'
import SearchControl from './SearchControl.vue'
const search = defineModel<string>('search', { default: '' })
const available = defineModel<boolean>('available', { default: false })
const sort = defineModel<ProductSort>('sort', { default: DEFAULT_PRODUCT_SORT })
defineEmits<{ search: [] }>()
</script>

<template>
  <div class="product-controls">
    <SearchControl v-model="search" class="search-card" @search="$emit('search')" />
    <AvailabilityControl v-model="available" />
    <SortControl v-model="sort" />
    <CategoryControl />
  </div>
</template>

<style scoped lang="scss">
.product-controls {
  display: contents;
  flex-direction: column;
  gap: var(--space-4);
}

.search-card {
  order: -2;
}

@media (min-width: 48rem) {
  .product-controls {
    display: flex;
  }

  .search-card {
    order: 0;
  }
}
</style>
