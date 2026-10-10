<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'

const items = [
  { label: 'تلگرام', icon: 'telegram' },
  { label: 'اینستاگرام', icon: 'instagram' },
  { label: 'توییتر', icon: 'twitter' },
  { label: 'یوتیوب', icon: 'youtube' },
  { label: 'لینکدین', icon: 'linkedin' }
] as const
</script>

<template>
  <nav class="social-icons" aria-label="شبکه‌های اجتماعی">
    <NuxtLink v-for="item in items" :key="item.icon" to="/" :aria-label="item.label">
      <AppIcon class="social-icon" :name="item.icon" />
    </NuxtLink>
  </nav>
</template>

<style scoped lang="scss">
.social-icons {
  display: flex;
  direction: ltr;
  gap: var(--space-4);

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    min-block-size: 1.5rem;
    color: var(--color-primary-soft);

    &:focus-visible,
    &:active {
      color: var(--color-primary);
    }
  }
}

.social-icon {
  inline-size: 21px;
  block-size: 21px;
}

@media (hover: hover) {
  .social-icons a:hover {
    color: var(--color-primary);
  }
}

@media (min-width: 64rem) {
  .social-icon {
    inline-size: 24px;
    block-size: 24px;
  }
}
</style>
