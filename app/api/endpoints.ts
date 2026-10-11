type ApiEndpoint = '/products' | `/products/${number}`

export function resolveApiEndpoint(baseURL: string, endpoint: ApiEndpoint): string {
  const base = new URL(`${baseURL.trim().replace(/\/+$/, '')}/`)
  if (!['http:', 'https:'].includes(base.protocol)) {
    throw new Error('API base URL must use HTTP or HTTPS')
  }
  return new URL(endpoint.slice(1), base).toString()
}

export function buildApiEndpoint(endpoint: ApiEndpoint): string {
  return resolveApiEndpoint(useRuntimeConfig().public.apiBaseUrl, endpoint)
}
