<script setup lang="ts">
import AppIcon from './AppIcon.vue'

withDefaults(defineProps<{ label: string; name?: string; disabled?: boolean }>(), {
  name: undefined,
  disabled: false
})
const model = defineModel<boolean>({ default: false })
const generatedName = useId()
</script>

<template>
  <label class="checkbox">
    <span class="checkbox-control">
      <input
        v-model="model"
        type="checkbox"
        :name="name ?? generatedName"
        :aria-label="label"
        :disabled="disabled"
      />
      <span class="checkbox-box" aria-hidden="true"><AppIcon name="check" /></span>
    </span>
    <span class="checkbox-label" dir="auto">{{ label }}</span>
    <slot />
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-block-size: var(--space-8);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: color var(--transition-duration) ease;

  &:has(input:checked) {
    color: var(--color-text-secondary);
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.checkbox-label {
  flex: 1;
  min-inline-size: 0;
  text-align: right;
}

.checkbox-control {
  position: relative;
  flex-shrink: 0;
  inline-size: var(--space-4);
  block-size: var(--space-4);
}

input {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  margin: 0;
  opacity: 0;
  cursor: inherit;
}

.checkbox-box {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-xs);
  background: var(--color-surface);
  pointer-events: none;
  transition:
    background-color var(--transition-duration) ease,
    border-color var(--transition-duration) ease;

  :deep(svg) {
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity var(--transition-duration) ease,
      transform var(--transition-duration) ease;
  }
}

input:checked + .checkbox-box {
  border-color: var(--color-primary);
  background: var(--color-primary);

  :deep(svg) {
    opacity: 1;
    transform: scale(1);
  }
}

input:focus-visible + .checkbox-box {
  outline: 2px solid var(--color-primary);
  outline-offset: 4px;
}

@media (hover: hover) {
  .checkbox:not(:has(input:disabled)):hover {
    color: var(--color-primary);

    .checkbox-box {
      border-color: var(--color-primary);
    }
  }
}
</style>
