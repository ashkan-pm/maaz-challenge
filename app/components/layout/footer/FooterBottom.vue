<script setup lang="ts">
import FooterSocialLinks from '~/components/layout/footer/FooterSocialLinks.vue'
import FooterTrustBadges from '~/components/layout/footer/FooterTrustBadges.vue'
</script>

<template>
  <div class="footer-bottom">
    <div class="bottom-content container">
      <div class="copyright">
        <p>
          تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی برداری پیگرد قانونی
          دارد.
        </p>
        <FooterSocialLinks />
      </div>
      <FooterTrustBadges class="trust-badges" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-bottom {
  border-start-start-radius: var(--radius-md);
  border-start-end-radius: var(--radius-md);
  background: var(--color-surface-subtle);
}

.bottom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  min-block-size: 15.1875rem;
  padding-block: var(--space-8) var(--space-10);
}

.copyright {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);

  p {
    max-inline-size: 20rem;
    text-align: center;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-regular);
    color: var(--color-text-secondary);
  }
}

@media (min-width: 64rem) {
  .bottom-content {
    position: relative;
    flex-direction: row;
    align-items: start;
    justify-content: center;
    min-block-size: 9.5rem;
    padding-block: var(--space-10) var(--space-6);
  }

  .copyright {
    inline-size: 20rem;
  }

  .trust-badges {
    position: absolute;
    inset-inline-start: 0;
    margin-block-start: calc(-1 * var(--space-1));
  }
}
</style>
