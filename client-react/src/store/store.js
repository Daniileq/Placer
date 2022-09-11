import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';
import placesSliceReducer from './placesSlice/placesSlice';
import searchSliceReducer from './searchSlice/searchSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    places: placesSliceReducer,
    search: searchSliceReducer,
  },
});

export default store;
