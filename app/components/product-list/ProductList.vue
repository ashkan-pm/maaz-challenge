<script setup lang="ts">
import AppliedFilters from './AppliedFilters.vue'
import ProductControlsPlaceholder from './ProductControlsPlaceholder.vue'
import ProductResultsState from './ProductResultsState.vue'
import ProductGrid from './ProductGrid.vue'
import { getProductCategories } from '~/utils/productCategories'
import { sortProducts } from '~/utils/productSort'
import type { Product } from '~/types/product'

const props = withDefaults(
  defineProps<{
    products: readonly Product[]
    loading?: boolean
    failed?: boolean
  }>(),
  { loading: false, failed: false }
)
defineEmits<{ retry: [] }>()

const { search, draft, available, sort, categories, submitSearch, clearSearch } = useProductFilters(
  () => props.products.map((product) => product.category)
)
const matchingProducts = computed(() =>
  props.products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.value) && (!available.value || product.available)
  )
)
const categoryOptions = computed(() => getProductCategories(props.products, matchingProducts.value))
const filteredProducts = computed(() =>
  sortProducts(
    matchingProducts.value.filter(
      (product) => !categories.value.length || categories.value.includes(product.category)
    ),
    sort.value
  )
)
</script>

<template>
  <section class="product-list" aria-labelledby="product-list-title">
    <h1 id="product-list-title">لیست محصولات</h1>
    <ProductControlsPlaceholder
      v-model:search="draft"
      v-model:available="available"
      v-model:sort="sort"
      v-model:categories="categories"
      :category-options="categoryOptions"
      class="controls"
      @search="submitSearch"
    />
    <div class="product-results">
      <AppliedFilters
        class="applied-filters-card"
        :search="search"
        :sort="sort"
        @remove-search="clearSearch"
      />
      <ProductResultsState
        v-if="loading || failed"
        class="results-grid"
        :state="loading ? 'loading' : 'error'"
        @retry="$emit('retry')"
      />
      <template v-else>
        <ProductGrid class="results-grid" :products="filteredProducts" />
        <ProductResultsState v-if="!filteredProducts.length" state="empty" />
      </template>
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
