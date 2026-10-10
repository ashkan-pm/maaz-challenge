<script setup lang="ts">
import type { ProductSummary } from '~/types/product'

defineProps<{ product: ProductSummary }>()
</script>

<template>
  <article class="product-card">
    <img class="product-image" :src="product.image" :alt="product.title" loading="lazy" />
    <h2 class="product-title" dir="auto" :title="product.title">{{ product.title }}</h2>
    <button class="details-button" type="button" :aria-label="`مشاهده جزئیات: ${product.title}`">
      مشاهده جزئیات
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <use href="/images/product-list/caret.svg#icon" />
      </svg>
    </button>
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
  object-fit: contain;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-block-size: var(--space-10);
  margin: 0 var(--space-1) var(--space-1);
  padding: var(--space-1) var(--space-2);
  border: 2px solid var(--color-background);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-primary);
  font-weight: var(--font-weight-bold);
  transition:
    background-color var(--transition-duration) ease,
    border-color var(--transition-duration) ease,
    color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    border-color: var(--color-primary);
    background: var(--color-primary);
    color: var(--color-surface);
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--color-primary);
      background: var(--color-primary);
      color: var(--color-surface);
    }
  }

  svg {
    flex-shrink: 0;
  }
}
</style>
