// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "studio-3011947479-d111f",
  "appId": "1:515653084303:web:6c1ae4bac836313afcfcfa",
  "storageBucket": "studio-3011947479-d111f.firebasestorage.app",
  "apiKey": "AIzaSyCsqncrDGuK0HC8QOyf0iJxMYYgY4T4R9I",
  "authDomain": "studio-3011947479-d111f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "515653084303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
