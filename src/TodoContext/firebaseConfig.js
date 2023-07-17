// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8RkoL1yRZzlVyAmawTRonmMIgWD9EHYg",
  authDomain: "todo-63a01.firebaseapp.com",
  projectId: "todo-63a01",
  storageBucket: "todo-63a01.appspot.com",
  messagingSenderId: "606300454049",
  appId: "1:606300454049:web:6f7aa92e987e92df4644e0",
  measurementId: "G-SXFT408HGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};