<script setup lang="ts">
import AppIcon from './AppIcon.vue'
import Card from './Card.vue'

const props = withDefaults(defineProps<{ title: string; defaultOpen?: boolean | 'desktop' }>(), {
  defaultOpen: false
})
const open = defineModel<boolean | undefined>('open', { default: undefined })
const initialized = ref(false)
const id = useId()
const isOpen = computed(() => open.value ?? props.defaultOpen === true)

onMounted(() => {
  if (open.value === undefined) {
    open.value =
      props.defaultOpen === 'desktop'
        ? window.matchMedia('(min-width: 48rem)').matches
        : props.defaultOpen
  }
  initialized.value = true
})
</script>

<template>
  <Card
    class="accordion"
    :class="{
      'is-open': isOpen,
      'is-initialized': initialized,
      'desktop-default': defaultOpen === 'desktop' && open === undefined
    }"
  >
    <h2>
      <button
        :id="`${id}-trigger`"
        class="accordion-trigger"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="`${id}-panel`"
        @click="open = !isOpen"
      >
        {{ title }}
        <AppIcon class="chevron" name="caret" />
      </button>
    </h2>
    <div
      :id="`${id}-panel`"
      class="accordion-panel"
      role="region"
      :aria-labelledby="`${id}-trigger`"
      :inert="!isOpen"
    >
      <div class="panel-clip">
        <div class="panel-content"><slot /></div>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.accordion {
  padding: 0;
  overflow: hidden;
}

h2 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--space-4);
}

.accordion-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  inline-size: 100%;
  padding: var(--space-4);
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;

  &:focus-visible {
    outline-offset: -4px;
  }
}

.chevron {
  flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform var(--transition-duration) ease;
}

.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition:
    grid-template-rows var(--transition-duration) ease,
    visibility 0s var(--transition-duration);
}

.panel-clip {
  min-block-size: 0;
  overflow: hidden;
}

.panel-content {
  padding: 0 var(--space-4) var(--space-4);
}

.is-open {
  .chevron {
    transform: rotate(90deg);
  }

  .accordion-panel {
    grid-template-rows: 1fr;
    visibility: visible;
    transition-delay: 0s;
  }
}

@media (min-width: 48rem) {
  .desktop-default {
    .chevron {
      transform: rotate(90deg);
    }

    .accordion-panel {
      grid-template-rows: 1fr;
      visibility: visible;
    }
  }
}

.accordion:not(.is-initialized) {
  .chevron,
  .accordion-panel {
    transition: none;
  }
}
</style>
