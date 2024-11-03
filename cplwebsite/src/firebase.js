// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy_6x1ovZ7GBHs9qWDqxav3CJLRVm8mKk",
  authDomain: "cpl2024-playerform.firebaseapp.com",
  projectId: "cpl2024-playerform",
  storageBucket: "cpl2024-playerform.firebasestorage.app",
  messagingSenderId: "428192152741",
  appId: "1:428192152741:web:1f7ce3962cdf0a8981e14c",
  measurementId: "G-7692FJB36H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);