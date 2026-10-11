<script setup lang="ts" generic="Value extends string">
withDefaults(defineProps<{ name: string; value: Value; label: string; disabled?: boolean }>(), {
  disabled: false
})
const model = defineModel<Value>()
</script>

<template>
  <label class="radio-button">
    <input v-model="model" type="radio" :name="name" :value="value" :disabled="disabled" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.radio-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-block-size: var(--space-8);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;

  &:has(input:checked) {
    color: var(--color-text-secondary);
  }

  &:has(input:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

input {
  appearance: none;
  flex-shrink: 0;
  inline-size: var(--space-4);
  block-size: var(--space-4);
  margin: 0;
  border: 2px solid var(--color-text-muted);
  border-radius: 50%;
  background: var(--color-surface);
  cursor: inherit;
  transition:
    border-color var(--transition-duration) ease,
    background-color var(--transition-duration) ease;

  &:checked {
    border-color: var(--color-primary);
    background: radial-gradient(circle, var(--color-primary) 0 45%, transparent 50%);
  }

  @media (hover: hover) {
    &:not(:disabled):hover {
      border-color: var(--color-primary);
    }
  }
}
</style>
