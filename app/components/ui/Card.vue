<script setup lang="ts">
withDefaults(defineProps<{ as?: 'div' | 'section' | 'form' }>(), { as: 'div' })
// Static elements instead of <component :is> keep slot content on Vue's compiled SSR path; the
// dynamic element path leaves fragment markers inside nested TransitionGroups, breaking hydration.
</script>

<template>
  <section v-if="as === 'section'" class="card"><slot /></section>
  <form v-else-if="as === 'form'" class="card"><slot /></form>
  <div v-else class="card"><slot /></div>
</template>

<style scoped lang="scss">
:where(.card) {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}
</style>
