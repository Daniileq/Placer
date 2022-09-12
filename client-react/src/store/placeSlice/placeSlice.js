/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  tags: [],
  loading: false,
  error: null,
};

const loadPlace = createAsyncThunk(
  'place/loadPlace',
  (id) => fetch(`/api/place/${id}`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);
const loadPlaceTags = createAsyncThunk(
  'place/loadPlaceTags',
  (id) => fetch(`/api/place/${id}/tags`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const placeSlice = createSlice({
  name: 'place',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadPlaceTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadPlaceTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadPlaceTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
  },
});

export default placeSlice.reducer;

export {
  loadPlace, loadPlaceTags,
};

/* eslint-enable no-param-reassign */
