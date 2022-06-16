import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from "./types";


const {items,totalPrice} = getCartFromLS()

const initialState: CartSliceState = {
  items,
  totalPrice
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice += action.payload.price
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(item => item.id === action.payload.id)
      state.totalPrice -= action.payload.price
      if (findItem) {
        findItem.count--
        if(findItem.count === 0){
          state.items = state.items.filter(obj => obj.id !== action.payload.id)
        }
      } else {
        state.items = state.items.filter(obj => obj.id !== action.payload.id)
      }
    },
    clearItem(state, action:PayloadAction<string>) {
      state.items = state.items.filter((obj) => Number(obj.id) !== Number(action.payload));
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }


  }

})




export const { addItem, removeItem, clearItems, clearItem } = cartSlice.actions


export default cartSlice.reducer