import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

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
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      // If an action needs to contain a unique ID or some other random value, always generate that first and put it in the action object. Reducers should never calculate random values, because that makes the results unpredictable.
      // "prepare callback" function can take multiple arguments, generate random values like unique IDs, and run whatever other synchronous logic is needed to decide what values go into the action object.
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content }
        }
      }
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