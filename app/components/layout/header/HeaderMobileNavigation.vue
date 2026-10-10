<script setup lang="ts">
import AppIcon from '~/components/ui/AppIcon.vue'
import HeaderMobileMenu from '~/components/layout/header/HeaderMobileMenu.vue'
import { headerNavigation } from './navigation'

const route = useRoute()
const menuOpen = ref(false)
const root = useTemplateRef<HTMLElement>('mobileNavigation')
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')

function closeMenu(returnFocus = false) {
  menuOpen.value = false
  if (returnFocus) menuButton.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) closeMenu(true)
}

function handleOutsideClick(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) closeMenu()
}

function handleDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

let desktopQuery: MediaQueryList | undefined
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handleOutsideClick)
  desktopQuery = window.matchMedia('(min-width: 64rem)')
  desktopQuery.addEventListener('change', handleDesktopChange)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handleOutsideClick)
  desktopQuery?.removeEventListener('change', handleDesktopChange)
})
watch(
  () => route.path,
  () => closeMenu()
)
</script>

<template>
  <div ref="mobileNavigation" class="mobile-navigation-controls">
    <button
      ref="menuButton"
      class="menu-button"
      type="button"
      :aria-label="menuOpen ? 'بستن منو' : 'باز کردن منو'"
      :aria-expanded="menuOpen"
      aria-controls="mobile-navigation"
      @click="menuOpen = !menuOpen"
    >
      <AppIcon name="menu" />
    </button>
    <Transition name="mobile-menu">
      <HeaderMobileMenu
        v-if="menuOpen"
        :items="headerNavigation"
        :inert="!menuOpen"
        @select="closeMenu()"
      />
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.mobile-navigation-controls {
  display: contents;
}

.menu-button {
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

  &[aria-expanded='true'],
  &:focus-visible,
  &:active {
    background: var(--color-primary);
    color: var(--color-surface);
  }
}

@media (hover: hover) {
  .menu-button:hover {
    background: var(--color-primary);
    color: var(--color-surface);
  }
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    transform var(--transition-duration) ease,
    opacity var(--transition-duration) ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(calc(-1 * var(--space-3)));
}

@media (min-width: 64rem) {
  .menu-button {
    display: none;
  }
}
</style>
