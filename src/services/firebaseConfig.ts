import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4c636T6DeiuKGLRd5eONN_PFXTuUtepA",
  authDomain: "react-dashboad.firebaseapp.com",
  projectId: "react-dashboad",
  storageBucket: "react-dashboad.appspot.com",
  messagingSenderId: "511197562409",
  appId: "1:511197562409:web:e6fdc561b917c0675dfe38",
  measurementId: "G-QTE4JBP370"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);
