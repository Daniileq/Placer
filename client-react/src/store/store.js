import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

import searchSliceReducer from './searchSlice/searchSlice';
import placeSliceRecucer from './placeSlice/placeSlice';
import commentSliceReducer from './commentSlice.js/commentSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    place: placeSliceRecucer,
    search: searchSliceReducer,
    comments: commentSliceReducer,
  },
});

export default store;
