<script setup lang="ts">
import AppliedFilters from './AppliedFilters.vue'
import ProductControlsPlaceholder from './ProductControlsPlaceholder.vue'
import ProductResultsState from './ProductResultsState.vue'
import ProductGrid from './ProductGrid.vue'
import type { ProductSummary } from '~/types/product'

const props = withDefaults(
  defineProps<{ products: readonly ProductSummary[]; loading?: boolean; failed?: boolean }>(),
  { loading: false, failed: false }
)
defineEmits<{ retry: [] }>()

const { search, draft, submitSearch, clearSearch } = useProductSearch()
const filteredProducts = computed(() =>
  props.products.filter((product) => product.title.toLowerCase().includes(search.value))
)

function measureFilters(element: Element) {
  const section = element as HTMLElement
  section.style.setProperty('--filters-height', `${section.scrollHeight}px`)
}
</script>

<template>
  <section class="product-list" aria-labelledby="product-list-title">
    <h1 id="product-list-title">لیست محصولات</h1>
    <ProductControlsPlaceholder v-model:search="draft" class="controls" @search="submitSearch" />
    <div class="product-results">
      <Transition name="filters" @enter="measureFilters" @before-leave="measureFilters">
        <div v-if="search" class="applied-filters-card">
          <AppliedFilters :search="search" @remove-search="clearSearch" />
        </div>
      </Transition>
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
  --filters-gap: var(--space-4);

  order: -1;
  min-block-size: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.filters-enter-active,
.filters-leave-active {
  block-size: var(--filters-height);
  transition:
    block-size var(--transition-duration) ease,
    margin-block-end var(--transition-duration) ease,
    opacity var(--transition-duration) ease;
}

.filters-enter-from,
.filters-leave-to {
  block-size: 0;
  // Cancel the parent's extra flex gap while the section is fully collapsed.
  margin-block-end: calc(-1 * var(--filters-gap));
  opacity: 0;
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
    --filters-gap: var(--space-6);

    order: 0;
  }

  .product-results {
    display: flex;
    flex: 1;
  }
}
</style>
