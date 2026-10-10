<script setup lang="ts">
import FooterLinks from '~/components/layout/footer/FooterLinks.vue'
import FooterBottom from '~/components/layout/footer/FooterBottom.vue'
</script>

<template>
  <footer class="site-footer">
    <FooterLinks />
    <FooterBottom />
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  overflow: clip;
  border-start-start-radius: var(--radius-md);
  border-start-end-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: 0 -2px 2px rgb(0 0 0 / 4%);
}
</style>
