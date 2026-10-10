<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
</script>

<template>
  <NuxtLink to="/" class="contact-link" aria-label="تماس">
    <span class="contact-label">تماس</span>
    <AppIcon name="phone" />
  </NuxtLink>
</template>

<style scoped lang="scss">
.contact-link {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  inline-size: var(--space-10);
  block-size: var(--space-10);
  padding: 0;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-primary);
  transition:
    background-color var(--transition-duration) ease,
    color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    background: var(--color-primary);
    color: var(--color-surface);
  }
}

.contact-label {
  display: none;
}

@media (hover: hover) {
  .contact-link:hover {
    background: var(--color-primary);
    color: var(--color-surface);
  }
}

@media (min-width: 64rem) {
  .contact-link {
    inline-size: 107px;
    gap: var(--space-2);
    border-radius: var(--radius-md);
    background: var(--color-primary);
    color: var(--color-surface);
    font-weight: var(--font-weight-bold);
    line-height: 1rem;

    &:hover,
    &:focus-visible,
    &:active {
      background: #c60049;
      color: var(--color-surface);
    }
  }

  .contact-label {
    display: inline;
  }
}
</style>
