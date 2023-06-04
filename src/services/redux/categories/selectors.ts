import { db } from '../../firebaseConfig';
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
import { getCategory, addCategory, deleteCategory, updateCategory } from './actions';
const uid = localStorage.getItem('@Auth:uid');

const getCategories = () => async (dispatch: any) => {
  const docRef = collection(db, `transactions/${uid}/user_categories`);

  const getCategoriesDoc = await getDocs(docRef);
  const categories = getCategoriesDoc.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch(getCategory(categories));
};

const insertCategory = (data: string) => async (dispatch: any) => {
  try {
    const docRef = collection(db, `transactions/${uid}/user_categories`);
    await addDoc(docRef, data);

    console.log('Document written with ID: ', docRef.id);
    // const newCategory = { id: docRef.id, ...data };
    // dispatch(addCategory(newCategory));
  } catch (error) {
    throw new Error(error.message);
  }
};

// const updateDocumentById =
//   (documentId: string, data: any) =>
//   async (dispatch: Dispatch<AnyAction>): Promise<void> => {
//     console.log('updateDocumentByID', data);
//     try {
//       const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
//       const docRef = doc(collectionRef, documentId);
//       await updateDoc(docRef, data);
//       console.log('Document updated with ID:', documentId);
//       dispatch(updateTransaction({ id: documentId, ...data }));
//     } catch (error) {
//       console.error('Error updating document:', error);
//     }
//   };

// const deleteDocumentById =
//   (document: string) =>
//   async (dispatch: Dispatch<AnyAction>): Promise<void> => {
//     try {
//       const docId = document.id;
//       const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
//       const docRef = doc(collectionRef, docId);
//       await deleteDoc(docRef);
//       console.log('Document removed with ID: ', docId);
//       dispatch(deleteTransaction(docId));
//     } catch (error) {
//       console.error('Error removing document: ', error);
//     }
//   };

export { getCategories, insertCategory };
