import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';
import addReduser from '../AddCard/reduserAddCard';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    place: addReduser,
  },
});

export default store;
