// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "moneybags-a15f4.firebaseapp.com",
  projectId: "moneybags-a15f4",
  storageBucket: "moneybags-a15f4.firebasestorage.app",
  messagingSenderId: "872363006128",
  appId: "1:872363006128:web:b8c50e6c3425ca8871c375",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
