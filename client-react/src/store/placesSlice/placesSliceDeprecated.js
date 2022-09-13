/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  favoritePlaces: [],
  placesToGo: [],
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

const toggleLike = createAsyncThunk(
  'places/toggleLike',
  (place) => fetch(`api/likes/${place.id}`, {
    method: 'post',
  })
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return { toggle: body.data, place };
    }),
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favoritePlaces = action.payload;
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        if (action.payload.toggle === 'liked') {
          state.favoritePlaces.push(action.payload.place);
          return;
        }
        state.favoritePlaces = state.favoritePlaces
          .filter((favoritePlace) => favoritePlace.id !== action.payload.place.id);
      });
  },
});

// Экспорт reducer-функции
export default placesSlice.reducer;

// Экспорт action creator-функций (thunk)
export {
  loadFavorites, toggleLike,
};

/* eslint-enable no-param-reassign */
