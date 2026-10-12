<script setup lang="ts">
import type { NuxtError } from '#app'
import StateCard from '~/components/ui/StateCard.vue'
import Button from '~/components/ui/Button.vue'
import { PRODUCT_NOT_FOUND } from '~/api/constants'

const props = defineProps<{ error: NuxtError }>()
const isNotFound = computed(() => props.error.statusCode === 404)
const isProductNotFound = computed(
  () => isNotFound.value && props.error.statusMessage === PRODUCT_NOT_FOUND
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
    <StateCard as="section" class="error-state" aria-labelledby="error-title">
      <span v-if="isNotFound" class="error-code" aria-hidden="true">۴۰۴</span>
      <h1 id="error-title">{{ title }}</h1>
      <p v-if="isProductNotFound">محصول مورد نظر موجود نیست یا حذف شده است</p>
      <p v-else-if="isNotFound">صفحه‌ای که به دنبال آن هستید وجود ندارد</p>
      <p v-else>لطفاً دوباره تلاش کنید</p>
      <Button @click="clearError({ redirect: '/' })">بازگشت به لیست محصولات</Button>
    </StateCard>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.error-state .button {
  margin-block-start: var(--space-2);
}

.error-code {
  color: var(--color-primary);
  font-size: 3rem;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}
</style>
