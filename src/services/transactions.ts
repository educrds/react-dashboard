import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  where,
  query,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { combineReducers, AnyAction } from 'redux';
import authStore from './auth/store';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import moment from 'moment';
const uid = localStorage.getItem('@Auth:uid');

// Actions
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
const deleteTransaction = transaction => ({ type: 'DELETE_TRANSACTION', payload: transaction });

// Função para obter todas as transactions (expenses e revenues)
enum TransactionType {
  EXPENSES = 'expenses',
  REVENUES = 'revenues',
}

const initialState = {
  transactions: [],
  transactionsByMonth: [],
};

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

const rootReducer = combineReducers({
  transactions: transactionReducer,
});

const transactionsStore = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const getTransactions = (type?: TransactionType) => async (dispatch: any) => {
  let queryRef = collection(db, `transactions/${uid}/user_transactions`);

  if (type) {
    queryRef = query(queryRef, where('type', '==', type));
  }
  const querySnapshot = await getDocs(queryRef);
  const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  dispatch(getTransaction(transactions));
};

const getTransactionsByMonth = (month: number) => async (dispatch: any, getState: any) => {
  const { transactions } = getState().transactions;
  console.log(transactions);

  const filteredTransactions = transactions.filter(
    transaction => Number(moment.unix(transaction.date).format('MM')) == month
  );
  dispatch(getTransactionByMonth(filteredTransactions));
};

const insertDocument = (data: string) => async (dispatch: any) => {
  try {
    const docRef = await addDoc(collection(db, `transactions/${uid}/user_transactions`), data);
    console.log('Document written with ID: ', docRef.id);
    const newTransaction = { id: docRef.id, ...data };
    dispatch(addTransaction(newTransaction));
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const updateDocumentById =
  (documentId: string, data: any) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    console.log('updateDocumentByID', data);
    try {
      const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
      const docRef = doc(collectionRef, documentId);
      await updateDoc(docRef, data);
      console.log('Document updated with ID:', documentId);
      dispatch(updateTransaction({ id: documentId, ...data }));
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

const deleteDocumentById =
  (document: string) =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
      const docId = document.id;
      const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
      const docRef = doc(collectionRef, docId);
      await deleteDoc(docRef);
      console.log('Document removed with ID: ', docId);
      dispatch(deleteTransaction(docId));
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };

export {
  insertDocument,
  deleteDocumentById,
  transactionsStore,
  getTransactions,
  updateDocumentById,
  getTransactionsByMonth,
};
