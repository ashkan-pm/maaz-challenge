<template>
  <section class="product-list" aria-labelledby="product-list-title">
    <h1 id="product-list-title">لیست محصولات</h1>
  </section>
</template>

<style scoped lang="scss">
.product-list {
  min-block-size: 24rem;
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 1px 2px rgb(0 0 0 / 6%);
}

h1 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
}
</style>
