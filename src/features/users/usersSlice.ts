import { createSlice } from "@reduxjs/toolkit";
import { selectCurrentUserId } from '@/features/auth/authSlice'
import { RootState } from "@/app/store";
import { createAppAsyncThunk } from '@/app/withTypes'
import { client } from '@/api/client'

type User = {
  id: string
  name: string
}

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const initialState: User[] = []

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  selectors: {
    // Note that these selectors are given just the `UsersState`
    // as an argument, not the entire `RootState`
    selectAllUsers: usersState => usersState,
    selectUserById: (usersState, userId: string | null) => usersState.find(user => user.id === userId)
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log('action', action);

      return action.payload
    })
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