import { configureStore } from '@reduxjs/toolkit'
import filter from "./slices/filterSlice"
export const store = configureStore({
  reducer: {
    filter,
  },
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch