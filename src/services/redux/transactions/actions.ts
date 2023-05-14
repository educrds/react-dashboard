const addTransaction = transaction => ({
  type: 'ADD_TRANSACTION',
  payload: transaction,
});
const getTransaction = transaction => ({
  type: 'GET_TRANSACTIONS',
  payload: transaction,
});
const getTransactionByMonth = transaction => ({
  type: 'GET_TRANSACTIONS_BY_MONTH',
  payload: transaction,
});
const updateTransaction = transaction => ({
  type: 'UPDATE_TRANSACTION',
  payload: transaction,
});
const deleteTransaction = transaction => ({ 
  type: 'DELETE_TRANSACTION',
  payload: transaction
 });

export {
  addTransaction,
  deleteTransaction,
  getTransaction,
  getTransactionByMonth,
  updateTransaction,
};
