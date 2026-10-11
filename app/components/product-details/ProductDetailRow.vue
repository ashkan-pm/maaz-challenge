<script setup lang="ts">
defineProps<{ label: string; description?: boolean }>()
</script>

<template>
  <div class="detail-row">
    <dt>{{ label }}</dt>
    <dd :class="{ 'detail-description': description }"><slot /></dd>
  </div>
</template>

<style scoped lang="scss">
.detail-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-inline-size: 0;
}

dt,
dd {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-block-size: var(--space-12);
  margin: 0;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: #f5f7fa;
  overflow-wrap: anywhere;
}

dt {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}

dd {
  color: var(--color-text);
  font-family: var(--font-family-content);
  font-size: var(--font-size-sm);
}

.detail-description {
  justify-content: flex-end;
  text-align: left;
}

@media (min-width: 48rem) {
  .detail-row {
    flex-direction: row;
  }

  dt {
    flex: 0 0 10.75rem;
    border-end-end-radius: var(--space-1);
    border-start-end-radius: var(--space-1);
  }

  dd {
    flex: 1;
    min-inline-size: 0;
    border-start-start-radius: var(--space-1);
    border-end-start-radius: var(--space-1);
  }
}
</style>
