<script setup lang="ts">
import { NuxtLink } from '#components'

withDefaults(defineProps<{ to?: string; type?: 'button' | 'submit' | 'reset'; pale?: boolean }>(), {
  pale: false,
  to: undefined,
  type: 'button'
})
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : type"
    class="button"
    :class="{ 'button-pale': pale }"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-block-size: var(--space-10);
  padding: var(--space-1) var(--space-4);
  border: 1px solid var(--color-primary);
  border-radius: var(--button-radius, var(--radius-sm));
  background: var(--button-background, var(--color-primary));
  color: var(--button-color, var(--color-surface));
  transition:
    background-color var(--transition-duration) ease,
    border-color var(--transition-duration) ease,
    color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    border-color: var(--color-primary);
    background: var(--button-hover-background, var(--color-primary-hover));
    color: var(--color-surface);
  }

  @media (hover: hover) {
    &:hover {
      border-color: var(--color-primary);
      background: var(--button-hover-background, var(--color-primary-hover));
      color: var(--color-surface);
    }
  }
}
.button-pale {
  --button-background: var(--color-surface);
  --button-color: var(--color-primary);
  --button-hover-background: var(--color-primary);
  --button-radius: var(--radius-md);

  border: 2px solid var(--color-background);
  font-weight: var(--font-weight-bold);
}
</style>
