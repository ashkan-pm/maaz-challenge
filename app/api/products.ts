import { PRODUCT_LIMIT } from './constants'
import { buildApiEndpoint } from './endpoints'
import type { ApiProduct } from '~/types/product'
import { transformProduct, transformProducts } from './transformers/product'

const requestOptions = { timeout: 10000, retry: 0 } as const

export function useProducts() {
  return useFetch(buildApiEndpoint('/products'), {
    key: `products:${PRODUCT_LIMIT}`,
    query: { limit: PRODUCT_LIMIT },
    ...requestOptions,
    transform: transformProducts,
    default: () => []
  })
}

export function useProduct(id: number) {
  return useFetch(buildApiEndpoint(`/products/${id}`), {
    key: `product:${id}`,
    ...requestOptions,
    transform: (response: ApiProduct | null | undefined) =>
      response ? transformProduct(response) : null,
    default: () => null
  })
}
