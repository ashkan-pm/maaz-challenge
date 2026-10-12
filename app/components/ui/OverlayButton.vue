<template>
  <button type="button" class="overlay-button"><slot /></button>
</template>

<style scoped lang="scss">
// Callers position the button; :where keeps their styles in charge.
:where(.overlay-button) {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--space-10);
  block-size: var(--space-10);
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  background: rgb(0 0 0 / 50%);
  transition: background-color var(--transition-duration) ease;

  &:focus-visible,
  &:active {
    background: var(--color-primary);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-primary);
    }
  }
}
</style>
