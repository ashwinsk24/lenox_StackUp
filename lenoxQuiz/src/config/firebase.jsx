import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDLZyn8Bts9gSy8ygxRm-ePZ5pIr02pS4",
  authDomain: "lenox23-c4036.firebaseapp.com",
  projectId: "lenox23-c4036",
  storageBucket: "lenox23-c4036.appspot.com",
  messagingSenderId: "506054275941",
  appId: "1:506054275941:web:d480bb03495ee4b837678c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
