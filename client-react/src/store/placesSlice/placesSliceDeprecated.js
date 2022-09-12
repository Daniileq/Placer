/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  /** {
      id: null,
      userId: null,
      title: null,
      adress: null,
      longtitude: null,
      latitude: null,
      description: null,
      tags: null,
      images: null,
      categoryId: null,
      isDeleted: null,
    }, */
  favorites: [],
  error: null,
};

const loadFavorites = createAsyncThunk(
  'places/loadFavorites',
  () => fetch('/api/favorites')
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  // reducers: {
  //   disableHelpMessage: (state) => {
  //     state.helpMessage = null;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default placesSlice.reducer;

// Экспорт action creator-функций
// export const { disableHelpMessage } = placesSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  loadFavorites,
};

/* eslint-enable no-param-reassign */
