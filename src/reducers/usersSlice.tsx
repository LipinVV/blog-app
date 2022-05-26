import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CommentType, PostType, StateType, UserType,
} from '../types';

export const INITIAL_STATE: StateType = {
  users: [],
  posts: [],
  comments: [],
  isLoading: true,
};

export const fetchUsers = createAsyncThunk<UserType[], undefined, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    return response.json();
  },
);

export const fetchUserPosts = createAsyncThunk<PostType[], {id: number, limit: number}, { rejectValue: string }>(
  'users/fetchUserPost',
  async ({ id, limit }, { rejectWithValue }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}&_limit=${limit}`);
    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    return response.json();
  },
);

export const fetchPostComments = createAsyncThunk<CommentType[], number, { rejectValue: string }>(
  'users/fetchPostComments',
  async (currentId, { rejectWithValue }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currentId}`);
    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    return response.json();
  },
);

export const postUserComment = createAsyncThunk<CommentType, {postId: number, newComment: CommentType, id: number}, { rejectValue: string }>(
  'users/postUserComment',
  async (data, { rejectWithValue }) => {
    const { postId, newComment, id } = data;
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        name: newComment.name,
        body: newComment.body,
        userId: id,
        email: newComment.email,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      return rejectWithValue('Server error');
    }
    return response.json();
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchPostComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(postUserComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postUserComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
