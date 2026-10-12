<script setup lang="ts">
import { useProducts } from '~/api/products'
import { NuxtErrorBoundary } from '#components'
import ProductResultsState from '~/components/product-list/ProductResultsState.vue'
import ProductList from '~/components/product-list/ProductList.vue'

useHead({ title: 'لیست محصولات' })
const { data: products, status, error, refresh } = await useProducts()
const loading = computed(() => status.value === 'pending' || status.value === 'idle')

async function recoverProducts(clearError: () => void) {
  await refresh()
  clearError()
}
</script>

<template>
  <NuxtErrorBoundary>
    <ProductList
      :products="products"
      :loading="loading"
      :failed="Boolean(error)"
      @retry="refresh()"
    />
    <template #error="{ clearError }">
      <ProductResultsState state="error" @retry="recoverProducts(clearError)" />
    </template>
  </NuxtErrorBoundary>
</template>
