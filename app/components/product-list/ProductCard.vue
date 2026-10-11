<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Image from '~/components/ui/Image.vue'
import type { ProductSummary } from '~/types/product'

defineProps<{ product: ProductSummary }>()
</script>

<template>
  <article class="product-card">
    <Image class="product-image" :src="product.image" :alt="product.title" loading="lazy" />
    <h2 class="product-title" dir="auto" :title="product.title">{{ product.title }}</h2>
    <Button pale class="details-button" :aria-label="`مشاهده جزئیات: ${product.title}`">
      مشاهده جزئیات
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <use href="/images/product-list/caret.svg#icon" />
      </svg>
    </Button>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
  padding: var(--space-2);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 16px 32px rgb(10 42 81 / 4%);
}

.product-image {
  inline-size: 100%;
  block-size: 10.625rem;
  border-radius: var(--radius-md);
}

.product-title {
  overflow: hidden;
  margin: var(--space-4) var(--space-3);
  color: var(--color-heading);
  font-family: var(--font-family-content);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-body);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.details-button {
  margin: 0 var(--space-1) var(--space-1);
  padding-inline: var(--space-2);

  svg {
    flex-shrink: 0;
  }
}
</style>
