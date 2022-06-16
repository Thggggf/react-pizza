export type Pizza = {
  id: string;
  imageUrl: string;
  name: string;
  price:number;
  sizes: number[];
  types: number[];
}

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface PizzasSliceState {
  items: Pizza[] ;
  status: Status;
}
export type FetchPizzasArgs = Record<string,string> & {
  currentPage: number;
}