<script setup lang="ts">
import type { IconName } from '~/types/icon'

type NavigationItem = {
  label: string
  icon: IconName
  path?: string
}

const route = useRoute()
const navigation = [
  { label: 'لیست محصولات', icon: 'category', path: '/' },
  { label: 'دریافت مشاوره', icon: 'book', path: undefined },
  { label: 'سوالات متداول', icon: 'question', path: undefined },
  { label: 'تماس با ما', icon: 'phone', path: undefined }
] as const satisfies readonly NavigationItem[]
</script>

<template>
  <header class="site-header">
    <div class="toolbar container">
      <button class="menu-button" type="button" aria-label="باز کردن منو">
        <AppIcon name="menu" />
      </button>
      <span class="header-spacer" aria-hidden="true" />
      <nav class="desktop-navigation" aria-label="منوی اصلی">
        <NuxtLink
          v-for="item in navigation"
          :key="item.icon"
          v-slot="{ href, navigate }"
          :to="item.path ?? '/'"
          custom
        >
          <a
            :href="href ?? undefined"
            class="navigation-link"
            :class="{ 'navigation-link--active': item.path === route.path }"
            :aria-current="item.path === route.path ? 'page' : undefined"
            @click="navigate"
          >
            <AppIcon :name="item.icon" />
            <span>{{ item.label }}</span>
            <img
              v-if="item.path === route.path"
              class="navigation-dot"
              src="/images/layout/active-dot.svg"
              alt=""
              width="5"
              height="5"
            />
          </a>
        </NuxtLink>
      </nav>
      <NuxtLink to="/" class="contact-link" aria-label="تماس">
        <span class="contact-label">تماس</span>
        <AppIcon name="phone" />
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  border-end-start-radius: var(--radius-md);
  border-end-end-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: 0 2px 2px rgb(0 0 0 / 8%);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-block-size: 4.5rem;
}

.menu-button,
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

@media (hover: hover) {
  .menu-button:hover,
  .contact-link:hover {
    background: var(--color-primary);
    color: var(--color-surface);
  }
}

.contact-label,
.desktop-navigation,
.header-spacer {
  display: none;
}

@media (min-width: 64rem) {
  .toolbar {
    gap: var(--space-6);
    min-block-size: 7.5rem;
  }

  .header-spacer {
    display: block;
    flex: 0 0 105px;
  }

  .menu-button {
    display: none;
  }

  .desktop-navigation {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: var(--space-6);
  }

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

    &:hover,
    &:focus-visible,
    &:active,
    &--active {
      color: var(--color-primary);
    }
  }

  .navigation-dot {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: calc(50% - 2.5px);
  }

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
