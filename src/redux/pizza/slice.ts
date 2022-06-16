import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../store";
import {PayloadAction} from "@reduxjs/toolkit"
import { Pizza, FetchPizzasArgs, PizzasSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";







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



export const { setItems,setStatus} = pizzasSlice.actions


export default pizzasSlice.reducer