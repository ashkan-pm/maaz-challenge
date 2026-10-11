<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import ProductDetailRow from './ProductDetailRow.vue'
import type { Product } from '~/types/product'

defineProps<{ product: Product }>()
const headingId = useId()
const numberFormatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 2 })
</script>

<template>
  <Card as="section" class="specifications-card" :aria-labelledby="headingId">
    <h2 :id="headingId">مشخصات فنی</h2>
    <dl>
      <ProductDetailRow label="قیمت">
        <span>{{ numberFormatter.format(product.price) }} دلار</span>
      </ProductDetailRow>
      <ProductDetailRow label="توضیحات" description>
        <p dir="auto">{{ product.description }}</p>
      </ProductDetailRow>
      <ProductDetailRow label="دسته بندی">
        <span class="category" dir="auto">{{ product.category }}</span>
      </ProductDetailRow>
      <ProductDetailRow label="رتبه">
        <span>{{ numberFormatter.format(product.rating.rate) }}</span>
      </ProductDetailRow>
      <ProductDetailRow label="تعداد">
        <span>{{ numberFormatter.format(product.stockQuantity) }}</span>
      </ProductDetailRow>
    </dl>
  </Card>
</template>

<style scoped lang="scss">
.specifications-card {
  padding: var(--space-6);

  h2 {
    margin-block-end: var(--space-4);
    color: var(--color-heading);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-body);
  }

  dl {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin: 0;
  }
}

.category {
  text-transform: capitalize;
}
</style>
