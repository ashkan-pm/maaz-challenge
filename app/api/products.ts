import { buildApiEndpoint } from './endpoints'
import { transformProducts } from './transformers/product'

export function useProducts() {
  return useFetch(buildApiEndpoint('/products'), {
    key: 'products:18',
    query: { limit: 18 },
    timeout: 10000,
    retry: 0,
    transform: transformProducts,
    default: () => []
  })
}
