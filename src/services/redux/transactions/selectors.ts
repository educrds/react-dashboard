import { db } from '../../firebaseConfig';
import moment from 'moment';
import { AnyAction } from 'redux';
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
import {
  getTransaction,
  addTransaction,
  getTransactionByMonth,
  deleteTransaction,
  updateTransaction,
} from './actions';
const uid = localStorage.getItem('@Auth:uid');

// Função para obter todas as transactions (expenses e revenues)
enum TransactionType {
  EXPENSES = 'expenses',
  REVENUES = 'revenues',
}

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
  getTransactions,
  updateDocumentById,
  getTransactionsByMonth,
};
