<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import Button from '~/components/ui/Button.vue'

defineProps<{ loading: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <Card class="details-state" :role="loading ? 'status' : 'alert'" :aria-busy="loading">
    <p>{{ loading ? 'در حال دریافت محصول' : 'دریافت محصول انجام نشد' }}</p>
    <Button v-if="!loading" @click="$emit('retry')">تلاش دوباره</Button>
  </Card>
</template>

<style scoped lang="scss">
.details-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  min-block-size: 20rem;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
