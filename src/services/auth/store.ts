// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const authStore = configureStore({
  reducer: rootReducer,
});

export default authStore;
