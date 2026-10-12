<script setup lang="ts">
import type { IconName } from '~/types/icon'

const props = defineProps<{ name: IconName }>()

// Native size and public/images folder for each icon; a missing entry is a type error.
const ICONS: Record<
  IconName,
  { folder: 'ui' | 'layout' | 'product-list'; width: number; height: number }
> = {
  magnify: { folder: 'ui', width: 24, height: 24 },
  home: { folder: 'ui', width: 18, height: 18 },
  close: { folder: 'ui', width: 8, height: 8 },
  search: { folder: 'ui', width: 14, height: 14 },
  sort: { folder: 'ui', width: 14, height: 8 },
  'sort-desc': { folder: 'ui', width: 14, height: 8 },
  dots: { folder: 'ui', width: 6, height: 6 },
  check: { folder: 'ui', width: 9, height: 7 },
  menu: { folder: 'layout', width: 16, height: 16 },
  category: { folder: 'layout', width: 16, height: 16 },
  book: { folder: 'layout', width: 16, height: 16 },
  question: { folder: 'layout', width: 16, height: 16 },
  phone: { folder: 'layout', width: 14, height: 14 },
  telegram: { folder: 'layout', width: 24, height: 24 },
  instagram: { folder: 'layout', width: 24, height: 24 },
  twitter: { folder: 'layout', width: 24, height: 24 },
  youtube: { folder: 'layout', width: 24, height: 24 },
  linkedin: { folder: 'layout', width: 24, height: 24 },
  caret: { folder: 'product-list', width: 16, height: 16 }
}
const icon = computed(() => ICONS[props.name])
</script>

<template>
  <svg
    :viewBox="`0 0 ${icon.width} ${icon.height}`"
    :width="icon.width"
    :height="icon.height"
    aria-hidden="true"
    focusable="false"
    class="icon"
  >
    <use :href="`/images/${icon.folder}/${name}.svg#icon`" />
  </svg>
</template>

<style scoped lang="scss">
.icon {
  display: block;
  flex-shrink: 0;
  color: inherit;
}
</style>
