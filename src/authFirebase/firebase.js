import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";  


const firebaseConfig = {
  apiKey: "AIzaSyDlpnsAM7VzcUVUB5Dfln9iOdWIGQtmGso",
  authDomain: "skillx-7b55c.firebaseapp.com",
  projectId: "skillx-7b55c",
  storageBucket: "skillx-7b55c.firebasestorage.app",
  messagingSenderId: "805907988145",
  appId: "1:805907988145:web:4c5c06e3ce8027a118ac90",
  measurementId: "G-4JP775V103"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realDb = getDatabase(app)



