import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

import searchSliceReducer from './searchSlice/searchSlice';
import addPlaceSliceReducer from './addPlaceSlice/addPlaceSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    addPlace: addPlaceSliceReducer,
    search: searchSliceReducer,
  },
});

export default store;
