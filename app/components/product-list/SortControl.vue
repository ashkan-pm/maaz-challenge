<script setup lang="ts">
import Accordion from '~/components/ui/Accordion.vue'
import RadioGroup from '~/components/ui/RadioGroup.vue'

const selectedSort = ref('quantity-asc')
const options = [
  { label: 'تعداد: کم به زیاد', value: 'quantity-asc' },
  { label: 'تعداد: زیاد به کم', value: 'quantity-desc' },
  { label: 'رتبه: زیاد به کم', value: 'rating-desc' },
  { label: 'رتبه: کم به زیاد', value: 'rating-asc' }
] as const
</script>

<template>
  <Accordion title="مرتب سازی" default-open="desktop">
    <RadioGroup v-model="selectedSort" label="مرتب سازی محصولات" :options="options" />
  </Accordion>
</template>
