import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../store";
import {PayloadAction} from "@reduxjs/toolkit"



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
interface PizzasSliceState {
  items: Pizza[] ;
  status: Status;
}
type FetchPizzasArgs = Record<string,string> & {
  currentPage: number;
}
export const fetchPizzas = createAsyncThunk<Pizza[],FetchPizzasArgs>(
  'pizzas/fetchPizzasStatus',
  async ({
    currentPage,
    categoryId,
    order,
    sortType,
    search
  }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://629f31168b939d3dc291db2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}${search}&sortBy=${sortType}&order=${order}`,
    );
    return data;
  }
)




const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending,(state) => {
      state.status = Status.LOADING
      state.items = []
    } );
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    });
    builder.addCase(fetchPizzas.rejected,  (state, action) => {
      state.status = Status.ERROR
      state.items = []

    })
  },

})

export const selectPizzasData = (state : RootState) => state.pizzas

export const { setItems,setStatus} = pizzasSlice.actions


export default pizzasSlice.reducer