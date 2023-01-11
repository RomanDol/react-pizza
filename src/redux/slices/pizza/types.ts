export type SearchPizzaParams = {
  order: string
  sortBy: string
  category: string
  search: string
  currentPage: string
}

export type Pizza = {
  id: string
  name: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}
