import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import transactionReducer from './reducer';

const initialState = {
  transactions: [],
  transactionsByMonth: [],
};
const rootReducer = combineReducers({
  transactions: transactionReducer,
});
const transactionsStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export { initialState, rootReducer, transactionsStore };
