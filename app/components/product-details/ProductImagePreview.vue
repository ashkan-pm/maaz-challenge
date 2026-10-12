<script setup lang="ts">
import Modal from '~/components/ui/Modal.vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import type { ProductSummary } from '~/types/product'

defineProps<{ product: ProductSummary }>()
const open = defineModel<boolean>({ default: false })
</script>

<template>
  <Modal v-model="open" label="پیش‌نمایش تصویر محصول">
    <template #default="{ close }">
      <div class="image-preview">
        <img :src="product.image" :alt="product.title" />
        <button type="button" class="close-button" aria-label="بستن پیش‌نمایش" @click="close">
          <AppIcon name="close" />
        </button>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.image-preview {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-surface);

  img {
    inline-size: auto;
    block-size: auto;
    max-inline-size: calc(100vw - 2 * var(--space-4));
    max-block-size: calc(100dvh - 2 * var(--space-4));
    object-fit: contain;
  }
}

.close-button {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--space-10);
  block-size: var(--space-10);
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  background: rgb(0 0 0 / 50%);
  color: var(--color-surface);
  transition: background-color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    background: var(--color-primary);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-primary);
    }
  }
}
</style>
