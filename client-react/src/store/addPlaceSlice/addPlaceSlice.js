/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  error: null,
};

const addPlace = createAsyncThunk(
  'addPlace/addPlace',
  (data) => fetch('/api/place', {
    method: 'POST',
    body: data,
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const addPlaceSlice = createSlice({
  name: 'addPlace',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addPlace.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default addPlaceSlice.reducer;

// Экспорт action creator-функций (thunk)
export {
  addPlace,
};

/* eslint-enable no-param-reassign */
