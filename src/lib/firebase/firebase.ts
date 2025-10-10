import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAbQln8ClTywZ2EgewokohYjMm-uGG7m1U",
  authDomain: "deft-epoch-474415-h3.firebaseapp.com",
  projectId: "deft-epoch-474415-h3",
  storageBucket: "deft-epoch-474415-h3.firebasestorage.app",
  messagingSenderId: "292768677111",
  appId: "1:292768677111:web:1a4fe08d8d86ce1efea7f2",
  measurementId: "G-H7DGLB1E2S",
  databaseUrl:
    "https://deft-epoch-474415-h3-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google_auth_provider = new GoogleAuthProvider();
