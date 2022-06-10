import { createSlice } from "@reduxjs/toolkit"



const initialState = {
  isLoading: true,
}

const homeStatesSlice = createSlice({
  name: 'homeStates',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    }

  }

})


export const {setIsLoading} = homeStatesSlice.actions


export default homeStatesSlice.reducer