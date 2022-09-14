import { configureStore } from '@reduxjs/toolkit';

import userSliceReducer from './userSlice/userSlice';
import usersSliceReducer from './usersSlice/usersSlice';
import searchSliceReducer from './searchSlice/searchSlice';
import placesSliceReducer from './placesSlice/placesSliceDeprecated';
import addPlaceSliceReducer from './addPlaceSlice/addPlaceSlice';
import placeSliceRecucer from './placeSlice/placeSlice';
import commentSliceReducer from './commentSlice.js/commentSlice';

const store = configureStore({
  reducer: {
    user: userSliceReducer,
    users: usersSliceReducer,
    addPlace: addPlaceSliceReducer,
    place: placeSliceRecucer,
    search: searchSliceReducer,
    places: placesSliceReducer,
    comments: commentSliceReducer,
  },
});

export default store;
