export type SortTypes = "rating" | "price" | "name" | "-price" | "-name"

export type Sort = {
  title: string;
  type: SortTypes,
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sort: Sort;
  currentPage: number;
}