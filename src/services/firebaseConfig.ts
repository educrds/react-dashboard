import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD4c636T6DeiuKGLRd5eONN_PFXTuUtepA',
  authDomain: 'react-dashboad.firebaseapp.com',
  projectId: 'react-dashboad',
  storageBucket: 'react-dashboad.appspot.com',
  messagingSenderId: '511197562409',
  appId: '1:511197562409:web:e6fdc561b917c0675dfe38',
  measurementId: 'G-QTE4JBP370',
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const db = getFirestore(app);

export { provider, auth, db };
