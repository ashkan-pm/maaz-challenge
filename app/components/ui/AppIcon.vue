<script setup lang="ts">
import type { IconName } from '~/types/icon'

const props = defineProps<{ name: IconName }>()
const size = computed(() => {
  if (props.name === 'phone') return 14
  if (['menu', 'category', 'book', 'question'].includes(props.name)) return 16
  return 24
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${size} ${size}`"
    :width="size"
    :height="size"
    aria-hidden="true"
    focusable="false"
    class="icon"
  >
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
