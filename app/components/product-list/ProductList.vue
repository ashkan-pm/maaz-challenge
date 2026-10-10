<script setup lang="ts">
import ProductControlsPlaceholder from './ProductControlsPlaceholder.vue'
import ProductGrid from './ProductGrid.vue'
import type { ProductSummary } from '~/types/product'

defineProps<{ products: readonly ProductSummary[] }>()
</script>

<template>
  <section class="product-list" aria-labelledby="product-list-title">
    <h1 id="product-list-title">لیست محصولات</h1>
    <ProductControlsPlaceholder class="controls" />
    <div class="product-results">
      <div class="applied-filters-placeholder" aria-hidden="true" />
      <ProductGrid :products="products" />
    </div>
  </section>
</template>

<style scoped lang="scss">
h1 {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.product-results {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-inline-size: 0;
}

.applied-filters-placeholder {
  min-block-size: var(--space-16);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

@media (min-width: 48rem) {
  .product-list {
    flex-direction: row;
    align-items: flex-start;
  }

  .controls {
    flex: 0 0 16.5rem;
  }

  .product-results {
    flex: 1;
  }
}
</style>
