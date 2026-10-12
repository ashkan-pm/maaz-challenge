import { enableAutoUnmount } from '@vue/test-utils'
import { afterEach } from 'vitest'

// Unmount every wrapper after each Nuxt test so global listeners and DOM nodes never leak.
enableAutoUnmount(afterEach)
