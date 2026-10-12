<script setup lang="ts">
import { useProduct } from '~/api/products'
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue'
import ProductImageCard from '~/components/product-details/ProductImageCard.vue'
import ProductSpecificationsCard from '~/components/product-details/ProductSpecificationsCard.vue'
import ProductDetailsState from '~/components/product-details/ProductDetailsState.vue'
import { PRODUCT_NOT_FOUND } from '~/api/constants'
import type { BreadcrumbItem } from '~/types/breadcrumb'

// Remount for each product so its request and SSR payload stay isolated by ID.
definePageMeta({ key: (route) => route.params.id as string })
const route = useRoute()
const rawId = route.params.id
const id = typeof rawId === 'string' && /^[1-9]\d*$/.test(rawId) ? Number(rawId) : NaN
if (!Number.isSafeInteger(id)) {
  throw createError({ statusCode: 404, statusMessage: PRODUCT_NOT_FOUND, fatal: true })
}

const { data: product, status, error, refresh } = await useProduct(id)
watchEffect(() => {
  if ((status.value === 'success' && !product.value) || error.value?.statusCode === 404) {
    throw createError({ statusCode: 404, statusMessage: PRODUCT_NOT_FOUND, fatal: true })
  }
})
useHead(() => ({ title: product.value?.title ?? 'جزئیات محصول' }))
const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'خانه', to: '/', icon: 'home' },
  { label: 'لیست محصولات', to: '/' },
  { label: product.value?.title ?? 'جزئیات محصول' }
])
</script>

<template>
  <div class="product-details">
    <Breadcrumbs :items="breadcrumbs" />
    <ProductDetailsState
      v-if="status === 'pending' || status === 'idle' || error"
      :loading="status === 'pending' || status === 'idle'"
      @retry="refresh()"
    />
    <template v-else-if="product">
      <ProductImageCard :product="product" />
      <ProductSpecificationsCard :product="product" />
    </template>
  </div>
</template>

<style scoped lang="scss">
.product-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
</style>
