export const SEARCH_MAX_LENGTH = 50

export function normalizeSearch(value: string) {
  return value.trim().toLowerCase().slice(0, SEARCH_MAX_LENGTH)
}
