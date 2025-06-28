import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvoULIGlelWlNbQjIt6mqmWUNYTfhM1jw",
  authDomain: "ai-trip-planner-43cdb.firebaseapp.com",
  projectId: "ai-trip-planner-43cdb",
  storageBucket: "ai-trip-planner-43cdb.appspot.com", // 🔧 fix `.app` → `.appspot.com`
  messagingSenderId: "440832290604",
  appId: "1:440832290604:web:3bf5e0266e87618a944689",
  measurementId: "G-S8YET2NNP8",
};

// Initialize app once (singleton)
const app = initializeApp(firebaseConfig);

// Firestore (used across app)
export const db = getFirestore(app);

// Optional: only init analytics in production browsers
// import { getAnalytics, isSupported } from "firebase/analytics";
// if (typeof window !== "undefined") {
//   isSupported().then((yes) => yes && getAnalytics(app));
// }
