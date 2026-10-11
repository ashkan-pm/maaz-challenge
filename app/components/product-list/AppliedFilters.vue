<script setup lang="ts">
import Card from '~/components/ui/Card.vue'
import AnimatedList from '~/components/ui/AnimatedList.vue'
import FilterChip from '~/components/ui/FilterChip.vue'
defineProps<{ search: string }>()
defineEmits<{ removeSearch: [] }>()
</script>

<template>
  <Card class="applied-filters" role="group" aria-labelledby="applied-filters-title">
    <h2 id="applied-filters-title">فیلترهای اعمال شده</h2>
    <AnimatedList class="filter-chips">
      <FilterChip
        v-if="search"
        key="search"
        :label="search"
        icon="search"
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
