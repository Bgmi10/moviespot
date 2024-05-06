import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAwI-Z_C2f74itUSeUjHENhTl2xiAKwFw",
  authDomain: "movieapp-cd283.firebaseapp.com",
  projectId: "movieapp-cd283",
  storageBucket: "movieapp-cd283.appspot.com",
  messagingSenderId: "787864521829",
  appId: "1:787864521829:web:7e91002be76ce2f1ea0a8c"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, analytics, auth, firestore };