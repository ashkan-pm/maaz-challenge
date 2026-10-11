<script setup lang="ts">
import { useProducts } from '~/api/products'
import { NuxtErrorBoundary } from '#components'
import ProductResultsState from '~/components/product-list/ProductResultsState.vue'
import ProductList from '~/components/product-list/ProductList.vue'

useHead({ title: 'لیست محصولات' })
const { data: products, status, error, refresh } = await useProducts()

async function recoverProducts(clearError: () => void) {
  await refresh()
  clearError()
}
</script>

<template>
  <NuxtErrorBoundary>
    <ProductList
      :products="products"
      :loading="status === 'pending' || status === 'idle'"
      :failed="Boolean(error)"
      @retry="refresh()"
    />
    <template #error="{ clearError }">
      <ProductResultsState state="error" @retry="recoverProducts(clearError)" />
    </template>
  </NuxtErrorBoundary>
</template>
