import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});

export default store;
