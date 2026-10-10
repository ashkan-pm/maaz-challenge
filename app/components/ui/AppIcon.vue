<script setup lang="ts">
import type { IconName } from '~/types/icon'

const props = defineProps<{ name: IconName }>()
const size = computed(() => {
  if (props.name === 'close') return 8
  if (['phone', 'search', 'sort', 'sort-desc'].includes(props.name)) return 14
  if (['menu', 'category', 'book', 'question'].includes(props.name)) return 16
  return 24
})
const height = computed(() => (['sort', 'sort-desc'].includes(props.name) ? 8 : size.value))
const source = computed(() => {
  const directory = ['close', 'search', 'sort', 'sort-desc'].includes(props.name) ? 'ui' : 'layout'
  return `/images/${directory}/${props.name}.svg#icon`
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${size} ${height}`"
    :width="size"
    :height="height"
    aria-hidden="true"
    focusable="false"
    class="icon"
  >
    <use :href="source" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: block;
  flex-shrink: 0;
  color: inherit;
}
</style>
