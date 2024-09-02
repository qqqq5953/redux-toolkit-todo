import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from '@/app/store'

interface User {
  id: string
  name: string
}

const initialState: User[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  selectors: {
    // Note that these selectors are given just the `UsersState`
    // as an argument, not the entire `RootState`
    selectAllUsers: usersState => usersState,
    selectUserById: (usersState, postId: string) => {
      return usersState.find(post => post.id === postId)
    }
  }
})

export default usersSlice.reducer

export const { selectAllUsers, selectUserById } = usersSlice.selectors

// export const selectAllUsers = (state: RootState) => state.users

// export const selectUserById = (state: RootState, userId: string | null) =>
//   state.users.find(user => user.id === userId)