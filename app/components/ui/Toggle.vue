<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ label: string; disabled?: boolean }>(), { disabled: false })
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <button
    type="button"
    role="switch"
    class="toggle"
    :class="{ 'is-active': model }"
    :aria-label="label"
    :aria-checked="model"
    :disabled="disabled"
    @click="model = !model"
  >
    <span class="toggle-track" aria-hidden="true">
      <span class="toggle-thumb"><AppIcon name="dots" /></span>
    </span>
  </button>
</template>

<style scoped lang="scss">
.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: var(--space-8);
  block-size: var(--space-8);
  padding: 0;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.toggle-track {
  position: relative;
  inline-size: var(--space-8);
  block-size: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-text-muted);
  transition: background-color var(--transition-duration) ease;
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--space-3);
  block-size: var(--space-3);
  border-radius: 50%;
  background: var(--color-surface);
  transform: translateX(0);
  transition: transform var(--transition-duration) ease;
}

.is-active {
  .toggle-track {
    background: var(--color-primary);
  }

  .toggle-thumb {
    transform: translateX(calc(-1 * var(--space-4)));
  }
}

@media (hover: hover) {
  .toggle:not(:disabled):hover .toggle-track {
    background: var(--color-text-secondary);
  }

  .toggle.is-active:not(:disabled):hover .toggle-track {
    background: var(--color-primary-hover);
  }
}
</style>
