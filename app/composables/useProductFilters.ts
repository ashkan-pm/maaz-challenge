import type { MaybeRefOrGetter } from 'vue'
import { normalizeCategories } from '~/utils/productCategories'
import type { LocationQueryRaw } from 'vue-router'
import { normalizeSort } from '~/utils/productSort'
import type { ProductSort } from '~/types/productSort'
import { normalizeSearch } from '~/utils/productSearch'

export function useProductFilters(knownCategories: MaybeRefOrGetter<readonly string[]> = []) {
  const route = useRoute()
  const router = useRouter()
  const search = computed(() => {
    const value = route.query.search
    return normalizeSearch(typeof value === 'string' ? value : '')
  })
  function updateQuery(query: LocationQueryRaw) {
    return router.push({ query: { ...route.query, ...query }, hash: route.hash })
  }

  const available = computed({
    get: () => route.query.available === 'true',
    set: (value: boolean) => {
      void updateQuery({ available: String(value) })
    }
  })
  const sort = computed({
    get: () => normalizeSort(route.query.sort),
    set: (value: ProductSort) => {
      void updateQuery({ sort: value })
    }
  })
  const categories = computed({
    get: () => normalizeCategories(route.query.category, toValue(knownCategories)),
    set: (value: string[]) => {
      const selected = normalizeCategories(value, toValue(knownCategories))
      void updateQuery({ category: selected.length ? selected : undefined })
    }
  })
  const draft = ref(search.value)

  watch(search, (value) => {
    draft.value = value
  })

  async function submitSearch() {
    const value = normalizeSearch(draft.value)
    await updateQuery({ search: value || undefined })
    draft.value = search.value
  }

  async function clearSearch() {
    await updateQuery({ search: undefined })
    draft.value = ''
  }

  return { search, draft, available, sort, categories, submitSearch, clearSearch }
}
