<script setup lang="ts">
import ProductImagePreview from './ProductImagePreview.vue'
import Card from '~/components/ui/Card.vue'
import Image from '~/components/ui/Image.vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import OverlayButton from '~/components/ui/OverlayButton.vue'
import type { ProductSummary } from '~/types/product'

defineProps<{ product: ProductSummary }>()
const titleId = useId()
const previewOpen = ref(false)
</script>

<template>
  <Card as="section" class="product-image-card" :aria-labelledby="titleId">
    <h1 :id="titleId" dir="auto">{{ product.title }}</h1>
    <div class="product-image-container">
      <Image class="product-image" :src="product.image" :alt="product.title" loading="eager" />
      <OverlayButton
        class="preview-button"
        aria-label="بزرگنمایی تصویر محصول"
        aria-haspopup="dialog"
        @click="previewOpen = true"
      >
        <AppIcon name="magnify" />
      </OverlayButton>
    </div>
  </Card>
  <ProductImagePreview v-model="previewOpen" :product="product" />
</template>

<style scoped lang="scss">
.product-image-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6) var(--space-4);

  h1 {
    color: var(--color-heading);
    font-family: var(--font-family-content);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-body);
    overflow-wrap: anywhere;
    text-align: left;
  }
}

.product-image-container {
  position: relative;
  min-inline-size: 0;
}

.product-image {
  block-size: 14.625rem;
  border-radius: var(--radius-md);
}

.preview-button {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-2);
}

@media (min-width: 48rem) {
  .product-image-card {
    padding-inline: var(--space-6);

    h1 {
      font-size: var(--font-size-lg);
      line-height: var(--space-8);
    }
  }

  .product-image {
    block-size: 19.375rem;
  }
}
</style>
