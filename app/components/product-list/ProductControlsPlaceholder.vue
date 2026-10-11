<script setup lang="ts">
import AvailabilityControl from './AvailabilityControl.vue'
import CategoryControl from './CategoryControl.vue'
import SortControl from './SortControl.vue'
import SearchControl from './SearchControl.vue'
</script>

<template>
  <div class="product-controls">
    <SearchControl class="search-card" />
    <AvailabilityControl />
    <SortControl />
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
