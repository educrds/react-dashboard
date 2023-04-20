// reducers.js
import { combineReducers } from 'redux';
import { SET_USER_ID } from './actions';

const initialState = {
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducers({
  auth: authReducer,
  // aqui podem ser adicionados outros reducers
});

export default reducer;
