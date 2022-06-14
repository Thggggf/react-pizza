import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({
    currentPage,
    categoryId,
    order,
    sortType,
    search
  }) => {
    const { data } = await axios.get(
      `https://629f31168b939d3dc291db2d.mockapi.io/items?page=${currentPage}&limit=4&${categoryId}${search}&sortBy=${sortType}&order=${order}`,
    );
    return data
  }
)



const initialState = {
  items: [],
  status: "loading", // loading | success | error
}

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
    status(state, action) {
      state.status = action.payload
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading"
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error"
      state.items = []

    } 
  },

})

export const selectPizzasData = (state) => state.pizzas

export const { setItems} = pizzasSlice.actions


export default pizzasSlice.reducer