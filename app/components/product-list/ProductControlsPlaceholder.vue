<script setup lang="ts">
import AvailabilityControl from './AvailabilityControl.vue'
import SearchControl from './SearchControl.vue'
</script>

<template>
  <div class="product-controls">
    <SearchControl class="search-card" />
    <AvailabilityControl />
    <div aria-hidden="true" class="control-placeholder sorting-placeholder" />
    <div aria-hidden="true" class="control-placeholder categories-placeholder" />
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

.control-placeholder {
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.sorting-placeholder {
  min-block-size: 12.5rem;
}

.categories-placeholder {
  min-block-size: 11.25rem;
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
