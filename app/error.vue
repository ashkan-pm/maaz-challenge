<script setup lang="ts">
import type { NuxtError } from '#app'
import Card from '~/components/ui/Card.vue'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)
const isProductNotFound = computed(
  () => isNotFound.value && props.error.statusMessage === 'Product not found'
)
const title = computed(() =>
  isProductNotFound.value
    ? 'محصول پیدا نشد'
    : isNotFound.value
      ? 'صفحه پیدا نشد'
      : 'مشکلی پیش آمده است'
)
useHead(() => ({ title: title.value }))
</script>

<template>
  <NuxtLayout>
    <Card as="section" class="error-state" aria-labelledby="error-title">
      <span v-if="isNotFound" class="error-code" aria-hidden="true">۴۰۴</span>
      <h1 id="error-title">{{ title }}</h1>
      <p v-if="isProductNotFound">محصول مورد نظر موجود نیست یا حذف شده است</p>
      <p v-else-if="isNotFound">صفحه‌ای که به دنبال آن هستید وجود ندارد</p>
      <p v-else>لطفاً دوباره تلاش کنید</p>
      <Button @click="clearError({ redirect: '/' })">بازگشت به لیست محصولات</Button>
    </Card>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  min-block-size: 20rem;
  text-align: center;

  h1 {
    color: var(--color-heading);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
  }

  p {
    color: var(--color-text-muted);
  }

  .button {
    margin-block-start: var(--space-2);
  }
}

.error-code {
  color: var(--color-primary);
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}
</style>
