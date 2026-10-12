<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import type { IconName } from '~/types/icon'

defineOptions({ inheritAttrs: false })
withDefaults(
  defineProps<{ label: string; icon?: IconName; clearable?: boolean; name?: string }>(),
  { icon: undefined, clearable: false, name: undefined }
)
const model = defineModel<string>({ default: '' })
const generatedName = useId()
const input = useTemplateRef<HTMLInputElement>('input')

function focusInput() {
  input.value?.focus()
}

function clearInput() {
  model.value = ''
  focusInput()
}
</script>

<template>
  <div class="input-field" @click="focusInput">
    <span v-if="icon" class="input-icon">
      <AppIcon :name="icon" />
    </span>
    <input
      ref="input"
      v-model="model"
      v-bind="$attrs"
      :name="name ?? generatedName"
      :aria-label="label"
      class="text-input"
    />
    <button
      v-if="clearable"
      type="button"
      class="clear-button"
      :aria-label="`پاک کردن ${label}`"
      @click.stop="clearInput"
    >
      <AppIcon name="close" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.input-field {
  display: flex;
  align-items: center;
  min-inline-size: 0;
  min-block-size: var(--space-10);
  padding-inline: var(--space-3);
  border: 1px solid var(--color-text-muted);
  border-radius: var(--radius-sm);
  background: var(--color-surface-subtle);
  cursor: text;
  transition: border-color var(--transition-duration) ease;

  &:focus-within {
    border-color: var(--color-primary);

    .input-icon {
      color: var(--color-primary);
    }
  }
}

.input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  block-size: var(--space-6);
  margin-inline-end: var(--space-3);
  padding-inline-end: var(--space-3);
  border-inline-end: 1px solid var(--color-text-muted);
  color: var(--color-text-muted);
  transition: color var(--transition-duration) ease;
}

.text-input {
  inline-size: 100%;
  min-inline-size: 0;
  padding: var(--space-2) 0;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--color-text);

  &::placeholder {
    color: var(--color-text-muted);
    opacity: 1;
  }
}

.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  inline-size: var(--space-6);
  block-size: var(--space-6);
  margin-inline-start: var(--space-2);
  padding: 0;
  border: 0;
  border-radius: var(--radius-xs);
  background: transparent;
  color: var(--color-text-muted);
  transition: color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    color: var(--color-primary);
  }

  @media (hover: hover) {
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
