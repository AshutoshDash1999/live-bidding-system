// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfpKAI8HeQOemBF8aGdxckLQilh4ljkVI",
  authDomain: "live-bidding-23258.firebaseapp.com",
  projectId: "live-bidding-23258",
  storageBucket: "live-bidding-23258.appspot.com",
  messagingSenderId: "93990319127",
  appId: "1:93990319127:web:da0f2d29931de7e2a49852",
  measurementId: "G-5YHMTSD6H0",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
