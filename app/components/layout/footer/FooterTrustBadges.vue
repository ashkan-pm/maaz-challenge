<template>
  <div class="trust-badges" aria-label="نمادهای اعتماد">
    <div class="trust-badge">
      <img
        src="/images/layout/trust-enamad.png"
        alt="نماد اعتماد الکترونیکی"
        width="51"
        height="58"
      />
    </div>
    <div class="trust-badge">
      <img src="/images/layout/trust-samandehi.png" alt="نشان ساماندهی" width="52" height="52" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.trust-badges {
  display: flex;
  direction: ltr;
  gap: var(--space-4);
}

.trust-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 4.5rem;
  block-size: 4.5rem;
  border-radius: var(--radius-xs);
  background: var(--color-surface);
}
</style>
