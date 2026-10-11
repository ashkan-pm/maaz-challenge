export interface ProductSummary {
  id: number
  title: string
  image: string
}

export interface ApiProduct extends ProductSummary {
  price: number
  description: string
  category: string
  rating: { rate: number; count: number }
}

export interface Product extends ApiProduct {
  available: boolean
  stockQuantity: number
}
