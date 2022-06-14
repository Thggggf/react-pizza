import { createSlice } from "@reduxjs/toolkit"




const initialState = {
  totalPrice: 0,
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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
    removeItem(state, action) {
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
    clearItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum += item.price * item.count, 0)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    }


  }

})

export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)
export const selectCart = (state) => state.cart


export const { addItem, removeItem, clearItems, clearItem } = cartSlice.actions


export default cartSlice.reducer