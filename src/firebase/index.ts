import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
 
const firebaseConfig = {
  apiKey: "AIzaSyC-V_hsBGmtIP3gbruU8MkFq0G_mmjTxYk",
  authDomain: "shunqor-movie-app.firebaseapp.com",
  projectId: "shunqor-movie-app",
  storageBucket: "shunqor-movie-app.appspot.com",
  messagingSenderId: "37589016167",
  appId: "1:37589016167:web:041f7b72cf567b31b1fec2"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };