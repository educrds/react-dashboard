import { initialState } from '../transactions/constants';

const categoryReducer = (state = initialState.categories, action: any) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: action.payload,
      };

    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: action.payload,
      };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
