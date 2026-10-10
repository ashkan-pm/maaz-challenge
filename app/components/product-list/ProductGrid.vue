<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { ProductSummary } from '~/types/product'

defineProps<{ products: readonly ProductSummary[] }>()
</script>

<template>
  <ul class="product-grid" aria-label="محصولات">
    <li v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6) var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: 48rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
