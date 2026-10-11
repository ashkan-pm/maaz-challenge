import { normalizeSearch } from '~/utils/productSearch'

export function useProductSearch() {
  const route = useRoute()
  const router = useRouter()
  const search = computed(() => {
    const value = route.query.search
    return normalizeSearch(typeof value === 'string' ? value : '')
  })
  const draft = ref(search.value)

  watch(search, (value) => {
    draft.value = value
  })

  async function submitSearch() {
    const value = normalizeSearch(draft.value)
    await router.push({ query: { ...route.query, search: value || undefined }, hash: route.hash })
    draft.value = search.value
  }

  async function clearSearch() {
    await router.push({ query: { ...route.query, search: undefined }, hash: route.hash })
    draft.value = ''
  }

  return { search, draft, submitSearch, clearSearch }
}
