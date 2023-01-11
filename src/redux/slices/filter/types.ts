export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "titele",
  TITLE_ASC = "-titele",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}
export type Sort = {
  name: string
  sortProperty: SortPropertyEnum
}
export interface FilterSliceState {
  searchValue: string
  categoryId: number
  currentPage: number
  sort: Sort
}
