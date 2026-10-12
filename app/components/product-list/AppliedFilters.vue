<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import AnimatedList from '~/components/ui/AnimatedList.vue'
import FilterChip from '~/components/ui/FilterChip.vue'
import type { FilterChipIconName } from '~/types/icon'
import type { ProductSort } from '~/types/productSort'
import { PRODUCT_SORT_OPTIONS } from '~/utils/productSort'
const props = defineProps<{ search: string; sort: ProductSort }>()
const sortLabel = computed(
  () =>
    PRODUCT_SORT_OPTIONS.find((option) => option.value === props.sort)?.label ??
    PRODUCT_SORT_OPTIONS[0].label
)
const sortIcon = computed<FilterChipIconName>(() =>
  props.sort.endsWith('-asc') ? 'sort' : 'sort-desc'
)
const chips = computed(() => {
  const sortChip = { key: 'sort', label: sortLabel.value, icon: sortIcon.value, removable: false }
  return props.search
    ? [{ key: 'search', label: props.search, icon: 'search' as const, removable: true }, sortChip]
    : [sortChip]
})
defineEmits<{ removeSearch: [] }>()
</script>

<template>
  <Card class="applied-filters" role="group" aria-labelledby="applied-filters-title">
    <h2 id="applied-filters-title">فیلترهای اعمال شده</h2>
    <AnimatedList class="filter-chips">
      <FilterChip
        v-for="chip in chips"
        :key="chip.key"
        :label="chip.label"
        :icon="chip.icon"
        :removable="chip.removable"
        @remove="$emit('removeSearch')"
      />
    </AnimatedList>
  </Card>
</template>

<style scoped lang="scss">
.applied-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4) var(--space-6);
  min-block-size: var(--space-16);
}

h2 {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.filter-chips {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: var(--space-2);
  max-inline-size: 100%;
}
</style>
