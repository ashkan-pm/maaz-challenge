<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import Button from '~/components/ui/Button.vue'
import Input from '~/components/ui/Input.vue'
</script>

<template>
  <Card
    as="form"
    class="search-control"
    role="search"
    aria-labelledby="product-search-title"
    @submit.prevent
  >
    <h2 id="product-search-title">فیلتر و جستجو</h2>
    <Input label="جستجوی محصولات" icon="search" placeholder="جستجو..." clearable />
    <Button type="submit">جستجو</Button>
  </Card>
</template>

<style scoped lang="scss">
.search-control {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

h2 {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--space-4);
}
</style>
