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
  data: [],
  error: null,
};

const loadPlaces = createAsyncThunk(
  'places/loadPlaces',
  ({ categories, tags }) => fetch(`/api/search?categories=${categories}&tags=${tags}`)
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
      .addCase(loadPlaces.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadPlaces.fulfilled, (state, action) => {
        state.isUser = true;
        state.data = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default placesSlice.reducer;

// Экспорт action creator-функций
// export const { disableHelpMessage } = placesSlice.actions;

// Экспорт action creator-функций (thunk)
export {
  loadPlaces,
};

/* eslint-enable no-param-reassign */
