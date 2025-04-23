// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvoULIGlelWlNbQjIt6mqmWUNYTfhM1jw",
  authDomain: "ai-trip-planner-43cdb.firebaseapp.com",
  projectId: "ai-trip-planner-43cdb",
  storageBucket: "ai-trip-planner-43cdb.firebasestorage.app",
  messagingSenderId: "440832290604",
  appId: "1:440832290604:web:3bf5e0266e87618a944689",
  measurementId: "G-S8YET2NNP8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);