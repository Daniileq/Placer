/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const loadComments = createAsyncThunk(
  'comments/loadComments',
  (id) => fetch(`/api/place/${id}/comments`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const addComment = createAsyncThunk(
  'comments/addComment',
  (data) => fetch(`/api/place/${data.placeId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;

export {
  loadComments, addComment,
};

/* eslint-enable no-param-reassign */
