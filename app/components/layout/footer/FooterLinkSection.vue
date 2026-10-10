<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import type { IconName } from '~/types/icon'

defineProps<{
  id: string
  title: string
  items: readonly { label: string; icon?: IconName }[]
  social?: boolean
}>()
</script>

<template>
  <nav class="link-section" :class="{ 'social-links': social }" :aria-labelledby="id">
    <h2 :id="id">{{ title }}</h2>
    <ul>
      <li v-for="item in items" :key="item.label">
        <NuxtLink to="/">
          <AppIcon v-if="item.icon" :name="item.icon" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.link-section {
  min-inline-size: 0;
}

h2 {
  margin-block-end: var(--space-6);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-strong);
}

ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
}

a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.social-links {
  ul {
    gap: var(--space-4);
  }

  a {
    color: var(--color-text-strong);
    font-size: var(--font-size-sm);

    &:focus-visible,
    &:active {
      color: var(--color-primary);
    }
  }

  :deep(.icon) {
    color: var(--color-text-muted);
    transition: color var(--transition-duration) ease;
  }

  a:focus-visible,
  a:active {
    :deep(.icon) {
      color: var(--color-primary);
    }
  }
}

@media (hover: hover) {
  .social-links a:hover {
    color: var(--color-primary);

    :deep(.icon) {
      color: var(--color-primary);
    }
  }
}
</style>
