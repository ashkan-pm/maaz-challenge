<script setup lang="ts">
import { useProducts } from '~/api/products'
import ProductList from '~/components/product-list/ProductList.vue'

useHead({ title: 'لیست محصولات' })
const { data: products, status, error, refresh } = await useProducts()
</script>

<template>
  <ProductList
    :products="products"
    :loading="status === 'pending' || status === 'idle'"
    :failed="Boolean(error)"
    @retry="refresh()"
  />
</template>
