import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  categoryId: 0,
  sort: {
    name: "популярные",
    type: "rating"
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
      console.log(state.sort)
    }

  }

})


export const {setCategoryId, setSort} = filterSlice.actions


export default filterSlice.reducer