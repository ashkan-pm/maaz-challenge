import { PRODUCT_LIMIT } from './constants'
import { buildApiEndpoint } from './endpoints'
import type { ApiProduct } from '~/types/product'
import { transformProduct, transformProducts } from './transformers/product'

export function useProducts() {
  return useFetch(buildApiEndpoint('/products'), {
    key: `products:${PRODUCT_LIMIT}`,
    query: { limit: PRODUCT_LIMIT },
    timeout: 10000,
    retry: 0,
    transform: transformProducts,
    default: () => []
  })
}

export function useProduct(id: number) {
  return useFetch(buildApiEndpoint(`/products/${id}`), {
    key: `product:${id}`,
    timeout: 10000,
    retry: 0,
    transform: (response: ApiProduct | null | undefined) =>
      response ? transformProduct(response) : null,
    default: () => null
  })
}
