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
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

// Actions
const addTransaction = transaction => ({
  type: 'ADD_TRANSACTION',
  payload: transaction,
});
const getTransaction = transaction => ({
  type: 'GET_TRANSACTIONS',
  payload: transaction,
});

const getFilteredTransactions = (type: string) => (state: any) =>
  state.transactions.transactions.filter((transaction: any) => transaction.type === type);

// Função para obter todas as transactions (expenses e revenues)
enum TransactionType {
  EXPENSES = 'expenses',
  REVENUES = 'revenues',
}

const getTransactions = (uid: string, type?: TransactionType) => async (dispatch: any) => {
  // definindo uma nova função que recebe o uid como parâmetro
  let queryRef = collection(db, `transactions/${uid}/user_transactions`);

  if (type) {
    queryRef = query(queryRef, where('type', '==', type));
  }
  const querySnapshot = await getDocs(queryRef);
  const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  dispatch(getTransaction(transactions));
};

const initialState = {
  transactions: [],
};

const transactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'DELETE_TRANSACTION':
      const transactions = state.transactions.filter(
        (transaction: any) => transaction.id !== action.payload
      );
      return {
        ...state,
        transactions: transactions,
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
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
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  transactions: transactionReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

const insertDocument = (uid: string, data: string) => async (dispatch: any) => {
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
  (uid: string, documentId: string, data: any) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    console.log('updateDocumentByID', data);
    try {
      const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
      const docRef = doc(collectionRef, documentId);
      await updateDoc(docRef, data);
      console.log('Document updated with ID:', documentId);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: { id: documentId, data } });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

const deleteDocumentById = (uid: string, document: string) => async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    const docId = document.id;
    const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
    const docRef = doc(collectionRef, docId);
    await deleteDoc(docRef);
    console.log('Document removed with ID: ', docId);
    dispatch({ type: 'DELETE_TRANSACTION', payload: docId });
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

export {
  insertDocument,
  deleteDocumentById,
  store,
  getTransactions,
  getFilteredTransactions,
  updateDocumentById,
};
