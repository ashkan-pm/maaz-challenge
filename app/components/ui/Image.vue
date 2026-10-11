<script setup lang="ts">
const props = withDefaults(
  defineProps<{ src: string; alt: string; loading?: 'lazy' | 'eager' }>(),
  { loading: 'lazy' }
)

const image = useTemplateRef<HTMLImageElement>('image')
const state = ref<'loading' | 'loaded' | 'error'>('loading')

function checkCachedImage() {
  if (image.value?.complete) {
    state.value = image.value.naturalWidth > 0 ? 'loaded' : 'error'
  }
}

function finishLoading(event: Event, result: 'loaded' | 'error') {
  // Ignore events from an image that was replaced when the source changed.
  if (event.target === image.value) state.value = result
}

onMounted(checkCachedImage)
watch(
  () => props.src,
  async () => {
    state.value = 'loading'
    await nextTick()
    checkCachedImage()
  }
)
</script>

<template>
  <div class="image" :class="`image-${state}`">
    <span class="image-skeleton" aria-hidden="true" />
    <img
      :key="src"
      ref="image"
      :src="src"
      :alt="alt"
      :loading="loading"
      @load="finishLoading($event, 'loaded')"
      @error="finishLoading($event, 'error')"
    />
    <span v-if="state === 'error'" class="image-fallback" aria-hidden="true">
      تصویر در دسترس نیست
    </span>
  </div>
</template>

<style scoped lang="scss">
.image {
  position: relative;
  overflow: hidden;
  isolation: isolate;

  img {
    inline-size: 100%;
    block-size: 100%;
    object-fit: var(--image-fit, contain);
    opacity: 0;
    transition: opacity var(--transition-duration) ease;
  }
}

.image-skeleton,
.image-fallback {
  position: absolute;
  inset: 0;
  background: var(--color-surface-subtle);
}

.image-skeleton {
  background: var(--color-background);
  pointer-events: none;
  transition: opacity var(--transition-duration) ease;

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, var(--color-surface), transparent);
    content: '';
    transform: translateX(-100%);
    animation: shimmer 1.5s ease-in-out infinite;
  }
}

.image-loaded {
  img {
    opacity: 1;
  }
}

.image-loaded,
.image-error {
  .image-skeleton {
    opacity: 0;

    &::after {
      animation: none;
    }
  }
}

.image-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-align: center;
}

@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .image-skeleton::after {
    animation: none;
  }
}
</style>
