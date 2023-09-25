import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userReducer from './userRedux';
import movieSlice from './movieSlice';

const rootReducer = combineReducers({
    user: userReducer,
    movie: movieSlice
});

const store = configureStore({
    reducer: rootReducer
})

export default store;