import { collection, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const insertDocument = async (uid: string, data: string) => {
  try {
    const docRef = await addDoc(collection(db, `transactions/${uid}/user_transactions`), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const deleteDocument = async (uid: string, docId: string) => {
  console.log(docId);
  try {
    const collectionRef = collection(db, `transactions/${uid}/user_transactions`);
    const docRef = doc(collectionRef, docId);
    await deleteDoc(docRef);
    console.log('Document removed with ID: ', docId);
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

export { insertDocument, deleteDocument };