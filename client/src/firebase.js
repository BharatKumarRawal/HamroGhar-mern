// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE,
  authDomain: "hamroghar-82b9c.firebaseapp.com",
  projectId: "hamroghar-82b9c",
  storageBucket: "hamroghar-82b9c.firebasestorage.app",
  messagingSenderId: "916911013492",
  appId: "1:916911013492:web:5be9a078a87a3198c21b21",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
