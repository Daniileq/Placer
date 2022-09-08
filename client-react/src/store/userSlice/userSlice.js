/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  login: '',
  error: null,
};

// Thunk!
const loadTest = createAsyncThunk(
  'user/loadTest',
  () => fetch('/auth')
    .then((response) => response.json())
    .then((body) => {
      if (body.error) {
        throw new Error(body.error);
      }
      return body.data;
    }),
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadTest.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadTest.fulfilled, (state, action) => {
        const success = action.payload;
        state.login = success;
        state.error = null;
      });
  },
});

// Экспорт reducer-функции
export default userSlice.reducer;

// Экспорт action creator-функций (thunk)
export { loadTest };

// Экспорт селекторов
export const getUserLogin = (state) => state.user.login;

/* eslint-enable no-param-reassign */
