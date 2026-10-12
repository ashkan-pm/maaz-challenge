export const SEARCH_MAX_LENGTH = 40

export function normalizeSearch(value: string) {
  return value.trim().toLowerCase().slice(0, SEARCH_MAX_LENGTH)
}

// Expects a search already passed through normalizeSearch.
export function matchesSearch(title: string, search: string) {
  return title.toLowerCase().includes(search)
}
