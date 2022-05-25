import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CommentType, PostType, StateType, UserType,
} from '../types';

export const INITIAL_STATE: StateType = {
  users: [],
  posts: [],
  comments: [],
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

export const fetchUserPost = createAsyncThunk<PostType[], number, { rejectValue: string }>(
  'users/fetchUserPost',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
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
        title: newComment.name,
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
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchUserPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(postUserComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default usersSlice.reducer;
