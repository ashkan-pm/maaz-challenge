// Vue's development build announces <Suspense> as experimental the first time Nuxt renders its
// root boundary. The notice is not actionable for this app, so drop only that message.
const SUSPENSE_NOTICE = '<Suspense> is an experimental feature'

export default defineNuxtPlugin(() => {
  if (!import.meta.dev && !import.meta.test) return
  const info = console.info
  console.info = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].startsWith(SUSPENSE_NOTICE)) return
    info(...args)
  }
})
