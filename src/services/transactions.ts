import { collection, doc, addDoc, deleteDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Função para obter todas as transactions (expenses e revenues)
const getTransactions = async (uid: string, type?: string) => {
  let queryRef = collection(db, `transactions/${uid}/user_transactions`);

  if (type) {
    queryRef = query(queryRef, where('type', '==', type));
  }

  const querySnapshot = await getDocs(queryRef);
  const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return transactions;
};

const insertDocument = async (uid: string, data: string) => {
  try {
    const docRef = await addDoc(collection(db, `transactions/${uid}/user_transactions`), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const deleteDocumentbyId = async (uid: string, docId: string) => {
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

export { insertDocument, deleteDocumentbyId, getTransactions };
