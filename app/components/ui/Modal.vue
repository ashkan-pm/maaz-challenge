<script setup lang="ts">
defineProps<{ label: string }>()
const open = defineModel<boolean>({ default: false })
const dialog = useTemplateRef('dialog')
let previousOverflow = ''
let previouslyFocused: HTMLElement | null = null
let locked = false

function close() {
  open.value = false
}

function restorePage() {
  if (!locked) return
  document.body.style.overflow = previousOverflow
  previouslyFocused?.focus({ preventScroll: true })
  locked = false
}

watch(
  [open, dialog],
  ([isOpen, element]) => {
    if (!element) return
    if (isOpen && !element.open) {
      previouslyFocused =
        document.activeElement instanceof HTMLElement ? document.activeElement : null
      previousOverflow = document.body.style.overflow
      locked = true
      document.body.style.overflow = 'hidden'
      element.showModal()
    } else if (!isOpen && element.open) {
      element.close()
      restorePage()
    }
  },
  { flush: 'post' }
)

onBeforeUnmount(() => {
  dialog.value?.close()
  restorePage()
})
</script>

<template>
  <dialog
    ref="dialog"
    class="modal"
    :aria-label="label"
    @click.self="close"
    @cancel.prevent="close"
    @close="close"
  >
    <div class="modal-content"><slot :close="close" /></div>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  right: auto;
  inline-size: 100vw;
  block-size: 100dvh;
  max-inline-size: none;
  max-block-size: none;
  margin: 0;
  padding: var(--space-4);
  border: 0;
  background: rgb(0 0 0 / 70%);
  backdrop-filter: blur(6px);
  color: inherit;
  opacity: 0;
  align-items: center;
  justify-content: center;
  transition:
    opacity var(--transition-duration) ease,
    display var(--transition-duration) allow-discrete,
    overlay var(--transition-duration) allow-discrete;

  &[open] {
    opacity: 1;
    display: flex;
  }

  &::backdrop {
    background: transparent;
  }
}

// Fade the content and blurred overlay as one layer, retained until the exit finishes.
@starting-style {
  .modal[open] {
    opacity: 0;
  }
}

.modal-content {
  max-inline-size: 100%;
  max-block-size: 100%;
  overflow: auto;
}
</style>
