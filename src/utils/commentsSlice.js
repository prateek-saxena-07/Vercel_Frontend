import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  loading: false,
  error: false,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCommentsSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchCommentsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    postCommentStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    postCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    postCommentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteCommentStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
    deleteCommentFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  postCommentStart,
  postCommentSuccess,
  postCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
