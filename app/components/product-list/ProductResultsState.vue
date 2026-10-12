<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import StateCard from '~/components/ui/StateCard.vue'

defineProps<{ state: 'loading' | 'error' | 'empty' }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <StateCard
    class="results-state"
    :role="state === 'error' ? 'alert' : 'status'"
    :aria-busy="state === 'loading'"
  >
    <template v-if="state === 'loading'">
      <span class="spinner" aria-hidden="true" />
      <h2>در حال دریافت محصولات</h2>
      <p>لطفاً کمی صبر کنید</p>
    </template>
    <template v-else-if="state === 'error'">
      <h2>دریافت محصولات انجام نشد</h2>
      <p>لطفاً دوباره تلاش کنید</p>
      <Button @click="$emit('retry')">تلاش دوباره</Button>
    </template>
    <template v-else>
      <h2>محصولی پیدا نشد</h2>
      <p>در حال حاضر محصولی برای نمایش وجود ندارد</p>
    </template>
  </StateCard>
</template>

<style scoped lang="scss">
button {
  margin-block-start: var(--space-2);
}

.spinner {
  inline-size: var(--space-8);
  block-size: var(--space-8);
  border: 3px solid var(--color-background);
  border-block-start-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
</style>
