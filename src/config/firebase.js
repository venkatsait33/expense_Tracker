// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaB9uohU8t3fXudSEZA-_kpet5OqFfgEY",
  authDomain: "expense-tracker-176d9.firebaseapp.com",
  projectId: "expense-tracker-176d9",
  storageBucket: "expense-tracker-176d9.appspot.com",
  messagingSenderId: "503542494884",
  appId: "1:503542494884:web:f9eb47e199a3b012739831",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy
