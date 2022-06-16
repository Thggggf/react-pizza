import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}



const initialState: CartSliceState = {
  totalPrice: 0,
  items: []
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
      state.totalPrice = state.items.reduce((sum, item) => sum += item.price * item.count, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }


  }

})

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => Number(obj.id) === Number(id))
export const selectCart = (state: RootState) => state.cart


export const { addItem, removeItem, clearItems, clearItem } = cartSlice.actions


export default cartSlice.reducer