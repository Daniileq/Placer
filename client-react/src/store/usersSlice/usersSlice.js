/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userPageInfo: {},
  userLoginsToGo: [],
  error: null,
};

const loadUser = createAsyncThunk(
  'users/loadUser',
  () => fetch('/api/users/:login')
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
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.userPageInfo = action.payload;
      })
      .addCase(loadUserLoginsToGo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUserLoginsToGo.fulfilled, (state, action) => {
        state.userLoginsToGo = action.payload;
      });
  },
});

// Экспорт reducer-функции
export default usersSlice.reducer;

// Экспорт action creator-функций (thunk)
export {
  loadUser, loadUserLoginsToGo,
};

/* eslint-enable no-param-reassign */
