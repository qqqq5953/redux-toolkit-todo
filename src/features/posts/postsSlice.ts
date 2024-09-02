import { RootState } from '@/app/store'
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'

// Define a TS type for the data we'll be using
export interface Post {
  id: string
  title: string
  content: string
  user: string
}

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

// Create an initial state value for the reducer, with that type
const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0' },
  { id: '2', title: 'Second Post', content: 'More text', user: '2' }
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
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId }
        }
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const updatedPost = state.find(post => post.id === id)

      if (updatedPost) {
        updatedPost.title = title
        updatedPost.content = content
      }
    }
  },
  selectors: {
    // Note that these selectors are given just the `PostsState`
    // as an argument, not the entire `RootState`
    selectAllPosts: postsState => postsState,
    selectPostById: (postsState, postId: string) => {
      return postsState.find(post => post.id === postId)
    }
  }

})

export const { postAdded, postUpdated } = postsSlice.actions

// replaced standalone selectors with these:
export const { selectAllPosts, selectPostById } = postsSlice.selectors

// Export the generated reducer function
export default postsSlice.reducer