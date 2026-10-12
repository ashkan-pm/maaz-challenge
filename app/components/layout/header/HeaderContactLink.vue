<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import Button from '~/components/ui/Button.vue'
</script>

<template>
  <Button to="/" class="contact-link" aria-label="تماس">
    <span class="contact-label">تماس</span>
    <AppIcon name="phone" />
  </Button>
</template>

<style scoped lang="scss">
.contact-link {
  --button-background: var(--color-surface);
  --button-color: var(--color-primary);
  --button-hover-background: var(--color-primary);

  flex-shrink: 0;
  inline-size: var(--space-10);
  block-size: var(--space-10);
  padding: 0;
}

.contact-label {
  display: none;
}

@media (min-width: 64rem) {
  .contact-link {
    --button-background: var(--color-primary);
    --button-color: var(--color-surface);
    --button-hover-background: var(--color-primary-hover);
    --button-radius: var(--radius-md);

    inline-size: 107px;
    font-weight: var(--font-weight-bold);
    line-height: 1rem;
  }

  .contact-label {
    display: inline;
  }
}
</style>
