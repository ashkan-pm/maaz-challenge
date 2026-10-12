<script setup lang="ts">
import Accordion from '~/components/ui/Accordion.vue'
import RadioGroup from '~/components/ui/RadioGroup.vue'
import type { ProductSort } from '~/types/productSort'
import { DEFAULT_PRODUCT_SORT, PRODUCT_SORT_OPTIONS } from '~/utils/productSort'

const selectedSort = defineModel<ProductSort>({ default: DEFAULT_PRODUCT_SORT })
</script>

<template>
  <Accordion title="مرتب سازی" default-open="desktop">
    <RadioGroup
      v-model="selectedSort"
      name="sort"
      label="مرتب سازی محصولات"
      :options="PRODUCT_SORT_OPTIONS"
    />
  </Accordion>
</template>
