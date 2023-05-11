import { initialState } from "./constants";

const transactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };

    case 'GET_TRANSACTIONS_BY_MONTH':
      return {
        ...state,
        transactionsByMonth: action.payload,
      };

    case 'DELETE_TRANSACTION':
      const transactions = state.transactions.filter(
        (transaction: any) => transaction.id !== action.payload
      );
      const transactionsByMonth = state.transactionsByMonth.filter(
        (transaction: any) => transaction.id !== action.payload
      );
      return {
        ...state,
        transactions: transactions,
        transactionsByMonth: transactionsByMonth,
      };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        transactionsByMonth: [...state.transactionsByMonth, action.payload],
      };

    case 'UPDATE_TRANSACTION':
      const updatedTransactions = [...state.transactions];
      const index = updatedTransactions.findIndex(
        transaction => transaction.id === action.payload.id
      );
      updatedTransactions[index] = action.payload;

      return {
        ...state,
        transactions: updatedTransactions,
        transactionsByMonth: updatedTransactions,
      };
    default:
      return state;
  }
};

export default transactionReducer;