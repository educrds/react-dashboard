import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import transactionReducer from './reducer';
import categoryReducer from '../categories/reducer';

const initialState = {
  transactions: [],
  transactionsByMonth: [],
  categories: [],
};
const rootReducer = combineReducers({
  transactions: transactionReducer,
  categories: categoryReducer,
});
const transactionsStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export { initialState, rootReducer, transactionsStore };
