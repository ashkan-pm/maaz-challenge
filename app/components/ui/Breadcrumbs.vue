<script setup lang="ts">
import { NuxtLink } from '#components'
import AppIcon from './AppIcon.vue'
import type { BreadcrumbItem } from '~/types/breadcrumb'

withDefaults(defineProps<{ items: readonly BreadcrumbItem[]; label?: string }>(), {
  label: 'مسیر صفحه'
})
</script>

<template>
  <nav :aria-label="label" class="breadcrumbs">
    <ol>
      <li v-for="(item, index) in items" :key="index" :class="{ 'current-item': !item.to }">
        <svg
          v-if="index"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/images/product-list/caret.svg#icon" />
        </svg>
        <NuxtLink v-if="item.to" :to="item.to" :aria-label="item.icon ? item.label : undefined">
          <AppIcon v-if="item.icon" :name="item.icon" />
          <span v-else dir="auto">{{ item.label }}</span>
        </NuxtLink>
        <span v-else aria-current="page" class="current-label" dir="auto" :title="item.label">
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped lang="scss">
.breadcrumbs {
  min-inline-size: 0;
  color: var(--color-text-muted);
  font-family: var(--font-family-ui);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-body);

  ol {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li,
  a {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  li,
  svg {
    flex-shrink: 0;
  }

  .current-item {
    flex-shrink: 1;
    min-inline-size: 0;
  }
}

.current-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
