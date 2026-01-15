import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3CQuLrN1xAHkvNQ1yORNnCGTghw7qTo",
  authDomain: "wishwell-c4093.firebaseapp.com",
  projectId: "wishwell-c4093",
  storageBucket: "wishwell-c4093.firebasestorage.app",
  messagingSenderId: "382286898510",
  appId: "1:382286898510:web:c529fccca381b79d062a1f",
  measurementId: "G-CH1SR1DLF7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

getAnalytics(app);
