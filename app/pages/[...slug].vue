<script setup lang="ts">
// Match every unknown path so vue-router does not warn, then show the shared 404 page the same way
// Nuxt does for unmatched routes; a non-fatal error keeps Nitro from logging each 404 as a failure.
showError(createError({ statusCode: 404, statusMessage: 'Page not found' }))
</script>

<template>
  <div />
</template>
