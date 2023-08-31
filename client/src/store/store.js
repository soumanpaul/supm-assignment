import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
