<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import type { NavigationItem } from '~/types/navigation'

defineProps<{ items: readonly NavigationItem[]; mobile?: boolean }>()
const emit = defineEmits<{ select: [] }>()
const route = useRoute()

function select(event: MouseEvent, navigate: (event: MouseEvent) => unknown) {
  navigate(event)
  emit('select')
}
</script>

<template>
  <NuxtLink
    v-for="item in items"
    :key="item.icon"
    v-slot="{ href, navigate }"
    :to="item.path ?? '/'"
    custom
  >
    <a
      :href="href ?? undefined"
      class="navigation-link"
      :class="{
        'navigation-link--active': item.path === route.path,
        'navigation-link--mobile': mobile
      }"
      :aria-current="item.path === route.path ? 'page' : undefined"
      @click="select($event, navigate)"
    >
      <AppIcon :name="item.icon" />
      <span>{{ item.label }}</span>
      <img
        v-if="!mobile && item.path === route.path"
        class="navigation-dot"
        src="/images/layout/active-dot.svg"
        alt=""
        width="5"
        height="5"
      />
    </a>
  </NuxtLink>
</template>

<style scoped lang="scss">
.navigation-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-block-size: 2.75rem;
  color: var(--color-heading);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;

  &:focus-visible,
  &:active,
  &--active {
    color: var(--color-primary);
  }

  &--mobile {
    padding-inline: var(--space-2);
    border-radius: var(--radius-sm);
    font-size: inherit;
  }
}

@media (hover: hover) {
  .navigation-link:hover {
    color: var(--color-primary);
  }
}

.navigation-dot {
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: calc(50% - 2.5px);
}
</style>
