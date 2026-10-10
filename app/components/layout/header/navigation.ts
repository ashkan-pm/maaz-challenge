import type { NavigationItem } from '~/types/navigation'

export const headerNavigation = [
  { label: 'لیست محصولات', icon: 'category', path: '/' },
  { label: 'دریافت مشاوره', icon: 'book', path: undefined },
  { label: 'سوالات متداول', icon: 'question', path: undefined },
  { label: 'تماس با ما', icon: 'phone', path: undefined }
] as const satisfies readonly NavigationItem[]
