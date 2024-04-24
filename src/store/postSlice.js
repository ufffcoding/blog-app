import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const initialState = {
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    emptyPosts: (state) => {
      state.posts = null;
    },
  },
});

export const { setPosts, emptyPosts } = postSlice.actions;

export default postSlice.reducer;
