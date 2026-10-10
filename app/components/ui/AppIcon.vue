<script setup lang="ts">
import type { IconName } from '~/types/icon'

const props = defineProps<{ name: IconName }>()
const size = computed(() => (props.name === 'phone' ? 14 : 16))
</script>

<template>
  <svg :width="size" :height="size" aria-hidden="true" focusable="false" class="icon">
    <use :href="`/images/layout/${name}.svg#icon`" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: block;
  flex-shrink: 0;
  color: inherit;
}
</style>
