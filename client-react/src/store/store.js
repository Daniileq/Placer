import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice/userSlice';

import searchSliceReducer from './searchSlice/searchSlice';
import addPlaceSliceReducer from './addPlaceSlice/addPlaceSlice';
import placeSliceRecucer from './placeSlice/placeSlice';
import commentSliceReducer from './commentSlice.js/commentSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    addPlace: addPlaceSliceReducer,
    place: placeSliceRecucer,
    search: searchSliceReducer,
    comments: commentSliceReducer,
  },
});

export default store;
