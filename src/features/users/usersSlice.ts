import { createSlice } from "@reduxjs/toolkit";
import { selectCurrentUserId } from '@/features/auth/authSlice'
import { RootState } from "@/app/store";

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
    selectUserById: (usersState, userId: string | null) => usersState.find(user => user.id === userId)
  }
})

export const selectCurrentUser = (state: RootState) => {
  const currentUserId = selectCurrentUserId(state)
  return selectUserById(state, currentUserId)
}

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export default usersSlice.reducer

// export const selectAllUsers = (state: RootState) => state.users

// export const selectUserById = (state: RootState, userId: string | null) =>
//   state.users.find(user => user.id === userId)