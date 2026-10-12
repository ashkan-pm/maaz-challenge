<script setup lang="ts">
// Render items with v-for, not v-if: SSR keeps v-if placeholder comments that TransitionGroup
// drops on the client, which causes hydration mismatches.
withDefaults(defineProps<{ tag?: 'div' | 'ul' }>(), { tag: 'div' })

function prepareLeavingItem(element: Element) {
  const item = element as HTMLElement
  // Preserve the item's geometry before removing it from the grid/flex flow.
  item.style.inlineSize = `${item.offsetWidth}px`
  item.style.blockSize = `${item.offsetHeight}px`
  item.style.left = `${item.offsetLeft}px`
  item.style.top = `${item.offsetTop}px`
}

function clearLeavingStyles(element: Element) {
  const item = element as HTMLElement
  for (const property of ['inline-size', 'block-size', 'left', 'top']) {
    item.style.removeProperty(property)
  }
}
</script>

<template>
  <TransitionGroup
    :tag="tag"
    name="list"
    class="animated-list"
    @before-leave="prepareLeavingItem"
    @after-leave="clearLeavingStyles"
    @leave-cancelled="clearLeavingStyles"
    @after-enter="clearLeavingStyles"
  >
    <slot />
  </TransitionGroup>
</template>

<style scoped lang="scss">
.animated-list {
  position: relative;
  // Moving and absolutely positioned items must not expand the page's scroll area.
  overflow-x: clip;
  overflow-y: visible;
}

:deep(.list-move),
:deep(.list-enter-active),
:deep(.list-leave-active) {
  transition:
    opacity var(--transition-duration) ease,
    transform var(--transition-duration) ease;
}

:deep(.list-enter-from),
:deep(.list-leave-to) {
  opacity: 0;
}

:deep(.list-leave-active) {
  position: absolute;
  pointer-events: none;
}
</style>
