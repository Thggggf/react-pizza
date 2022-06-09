import { createSlice, PayloadAction } from '@reduxjs/toolkit'



const initialState = {
  value: "",
  posts: [],
  count:0

}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
export const {} = filterSlice.actions

export default filterSlice.reducer