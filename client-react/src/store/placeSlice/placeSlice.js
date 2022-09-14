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

const editPlace = createAsyncThunk(
  'place/editPlace',
  (payload) => fetch(`/api/place/${Number(payload.id)}/edit`, {
    method: 'PUT',
    body: payload.data,
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const deletePlace = createAsyncThunk(
  'place/deletePlace',
  (id) => fetch(`/api/place/${Number(id)}/delete`)
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
      .addCase(editPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(deletePlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default placeSlice.reducer;

export {
  loadPlace, loadPlaceTags, editPlace, deletePlace,
};

/* eslint-enable no-param-reassign */
