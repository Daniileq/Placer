/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  personInfo: {},
  personPlaces: [],
  userLoginsToGo: [],
  personLoaded: null,
  error: null,
};

const loadPerson = createAsyncThunk(
  'users/loadPerson',
  ({ login }) => fetch(`/api/users/${login}`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      if (!body.data) {
        throw new Error('Пользователь не найден');
      }
      return body.data;
    }),
);

const loadPersonPlaces = createAsyncThunk(
  'users/loadPersonPlaces',
  ({ personId }) => fetch(`/api/users/${personId}/places`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const loadUserLoginsToGo = createAsyncThunk(
  'users/loadUserLoginsToGo',
  ({ placeId }) => fetch(`/api/users/togo/${placeId}`)
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadPerson.rejected, (state, action) => {
        state.personLoaded = false;
        state.error = action.error.message;
      })
      .addCase(loadPerson.fulfilled, (state, action) => {
        state.personLoaded = true;
        state.personInfo = action.payload;
      })
      .addCase(loadUserLoginsToGo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUserLoginsToGo.fulfilled, (state, action) => {
        state.userLoginsToGo = action.payload;
      })
      .addCase(loadPersonPlaces.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadPersonPlaces.fulfilled, (state, action) => {
        state.personPlaces = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default usersSlice.reducer;

// Экспорт action creator-функций (thunk)
export {
  loadPerson, loadPersonPlaces, loadUserLoginsToGo,
};

/* eslint-enable no-param-reassign */
