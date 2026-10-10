<script setup lang="ts">
import FilterChip from '~/components/ui/FilterChip.vue'
</script>

<template>
  <div class="applied-filters" role="group" aria-labelledby="applied-filters-title">
    <h2 id="applied-filters-title">فیلترهای اعمال شده</h2>
    <div class="filter-chips">
      <FilterChip label="دولنگه" icon="search" />
      <FilterChip label="تعداد" icon="sort" />
      <FilterChip label="تعداد نزولی" icon="sort-desc" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.applied-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4) var(--space-6);
  min-block-size: var(--space-16);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
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
