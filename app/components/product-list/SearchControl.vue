<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
</script>

<template>
  <form class="search-control" role="search" aria-labelledby="product-search-title" @submit.prevent>
    <h2 id="product-search-title">فیلتر و جستجو</h2>
    <Input label="جستجوی محصولات" icon="search" placeholder="جستجو..." clearable />
    <Button type="submit">جستجو</Button>
  </form>
</template>

<style scoped lang="scss">
.search-control {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

h2 {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--space-4);
}
</style>
