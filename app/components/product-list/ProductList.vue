<script setup lang="ts">
import AppliedFilters from './AppliedFilters.vue'
import ProductControlsPlaceholder from './ProductControlsPlaceholder.vue'
import ProductResultsState from './ProductResultsState.vue'
import ProductGrid from './ProductGrid.vue'
import type { ProductSummary } from '~/types/product'

withDefaults(
  defineProps<{ products: readonly ProductSummary[]; loading?: boolean; failed?: boolean }>(),
  { loading: false, failed: false }
)
defineEmits<{ retry: [] }>()
</script>

<template>
  <section class="product-list" aria-labelledby="product-list-title">
    <h1 id="product-list-title">لیست محصولات</h1>
    <ProductControlsPlaceholder class="controls" />
    <div class="product-results">
      <AppliedFilters class="applied-filters-card" />
      <ProductResultsState
        v-if="loading || failed || !products.length"
        class="results-grid"
        :state="loading ? 'loading' : failed ? 'error' : 'empty'"
        @retry="$emit('retry')"
      />
      <ProductGrid v-else class="results-grid" :products="products" />
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
  gap: var(--space-4);
}

.applied-filters-card {
  order: -1;
}

.product-list .results-grid {
  margin-block-start: var(--space-2);
}

.product-results {
  display: contents;
  flex-direction: column;
  gap: var(--space-6);
  min-inline-size: 0;
}

@media (min-width: 48rem) {
  .product-list {
    flex-direction: row;
    align-items: flex-start;
    gap: var(--space-6);
  }

  .product-list .results-grid {
    margin-block-start: 0;
  }

  .controls {
    flex: 0 0 16.5rem;
  }

  .applied-filters-card {
    order: 0;
  }

  .product-results {
    display: flex;
    flex: 1;
  }
}
</style>
