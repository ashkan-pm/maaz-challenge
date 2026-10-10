<template>
  <div class="product-controls" aria-hidden="true">
    <div class="control-placeholder search-placeholder" />
    <div class="control-placeholder availability-placeholder" />
    <div class="control-placeholder sorting-placeholder" />
    <div class="control-placeholder categories-placeholder" />
  </div>
</template>

<style scoped lang="scss">
.product-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.control-placeholder {
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.search-placeholder {
  min-block-size: 10rem;
}

.availability-placeholder {
  min-block-size: var(--space-12);
}

.sorting-placeholder {
  min-block-size: 12.5rem;
}

.categories-placeholder {
  min-block-size: 11.25rem;
}
</style>
