import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice"
import homeStates from './slices/homeStatesSlice'
export const store = configureStore({
  reducer: {
    filter,
    homeStates,
  },
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch