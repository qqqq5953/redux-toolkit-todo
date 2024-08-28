import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
}

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

// Create the slice and pass in the initial state
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Declare a "case reducer" named `postAdded`.
    // The type of `action.payload` will be a `Post` object.
    postAdded(state, action: PayloadAction<Post>) {
      // "Mutate" the existing state array, which is
      // safe to do here because `createSlice` uses Immer inside.
      state.push(action.payload)
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload
      const updatedPost = state.find(post => post.id === id)

      if (updatedPost) {
        updatedPost.title = title
        updatedPost.content = content
      }
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions

// Export the generated reducer function
export default postsSlice.reducer