import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

import addReduser from '../AddCard/reduserAddCard';
import searchSliceReducer from './searchSlice/searchSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    place: addReduser,
    search: searchSliceReducer,
  },
});

export default store;
