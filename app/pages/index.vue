<script setup lang="ts">
import ProductList from '~/components/product-list/ProductList.vue'
import { sampleProducts } from '~/data/sample-products'

useHead({ title: 'لیست محصولات' })
</script>

<template>
  <ProductList :products="sampleProducts" />
</template>
