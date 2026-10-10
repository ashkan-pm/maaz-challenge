<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import type { NavigationItem } from '~/types/navigation'

defineProps<{ items: readonly NavigationItem[] }>()
const emit = defineEmits<{ select: [] }>()
const route = useRoute()

function select(event: MouseEvent, navigate: (event: MouseEvent) => unknown) {
  navigate(event)
  emit('select')
}
</script>

<template>
  <nav id="mobile-navigation" class="mobile-navigation container" aria-label="منوی موبایل">
    <NuxtLink
      v-for="item in items"
      :key="item.icon"
      v-slot="{ href, navigate }"
      :to="item.path ?? '/'"
      custom
    >
      <a
        :href="href ?? undefined"
        class="mobile-link"
        :class="{ 'mobile-link--active': item.path === route.path }"
        :aria-current="item.path === route.path ? 'page' : undefined"
        @click="select($event, navigate)"
      >
        <AppIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </a>
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.mobile-navigation {
  position: absolute;
  inset-block-start: calc(100% + var(--space-6));
  inset-inline: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-block-size: 2.75rem;
  padding-inline: var(--space-2);
  border-radius: var(--radius-sm);
  color: var(--color-heading);
  font-weight: var(--font-weight-medium);

  &--active,
  &:focus-visible,
  &:active {
    color: var(--color-primary);
  }
}

@media (hover: hover) {
  .mobile-link:hover {
    color: var(--color-primary);
  }
}

@media (min-width: 64rem) {
  .mobile-navigation {
    display: none;
  }
}
</style>
