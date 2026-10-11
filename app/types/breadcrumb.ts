import type { RouteLocationRaw } from 'vue-router'
import type { IconName } from './icon'

export type BreadcrumbItem =
  | { label: string; to: RouteLocationRaw; icon?: IconName }
  | { label: string; to?: never; icon?: never }
