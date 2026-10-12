<script setup lang="ts">
import StateCard from '~/components/ui/StateCard.vue'
import Button from '~/components/ui/Button.vue'

defineProps<{ loading: boolean }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <StateCard class="details-state" :role="loading ? 'status' : 'alert'" :aria-busy="loading">
    <p>{{ loading ? 'در حال دریافت محصول' : 'دریافت محصول انجام نشد' }}</p>
    <Button v-if="!loading" @click="$emit('retry')">تلاش دوباره</Button>
  </StateCard>
</template>

<style scoped lang="scss">
.details-state {
  gap: var(--space-4);
  color: var(--color-text-muted);
}
</style>
