import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

import addReduser from '../AddCard/reduserAddCard';
import placesSliceReducer from './placesSlice/placesSlice';
import searchSliceReducer from './searchSlice/searchSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    place: addReduser,
    places: placesSliceReducer,
    search: searchSliceReducer,
  },
});

export default store;
