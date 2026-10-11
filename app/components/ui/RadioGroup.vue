<script setup lang="ts" generic="Value extends string">
import RadioButton from './RadioButton.vue'

withDefaults(
  defineProps<{
    label: string
    options: readonly { label: string; value: Value; disabled?: boolean }[]
    name?: string
  }>(),
  { name: undefined }
)
const model = defineModel<Value>()
const generatedName = useId()
</script>

<template>
  <fieldset class="radio-group">
    <legend>{{ label }}</legend>
    <RadioButton
      v-for="option in options"
      :key="option.value"
      v-model="model"
      :name="name ?? generatedName"
      :value="option.value"
      :label="option.label"
      :disabled="option.disabled"
    />
  </fieldset>
</template>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

legend {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
