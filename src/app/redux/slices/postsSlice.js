// postsSlice.js
"use client";
import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    addPost: (state, action) => {
      state.data = [action.payload, ...state.data];
    },
    editPost: (state, action) => {
      const { id, title, body } = action.payload;
      state.data = state.data.map((post) => (post.id === id ? { ...post, title, body } : post));
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.data = state.data.filter((post) => post.id !== postId);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPosts, addPost, editPost, deletePost, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
