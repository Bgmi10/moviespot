
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "822053022303",
  appId: "1:822053022303:web:5d47da0d8245b0c7bc49ea",
  measurementId: "G-REK6L2G6W0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };