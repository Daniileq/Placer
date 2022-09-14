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
  () => fetch('/api/users/togo')
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
        console.log(state);
        console.log(action);
      })
      .addCase(loadUserLoginsToGo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadUserLoginsToGo.fulfilled, (state, action) => {
        console.log(state);
        console.log(action);
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
