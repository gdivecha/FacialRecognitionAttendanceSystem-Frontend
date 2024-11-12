// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsuwhfgKY1vcIq1n8v_ao1R9HT1KT3kiQ",
  authDomain: "aitend-378b7.firebaseapp.com",
  projectId: "aitend-378b7",
  storageBucket: "aitend-378b7.firebasestorage.app",
  messagingSenderId: "1017885993414",
  appId: "1:1017885993414:web:574a1c221a65fb4cd66ac7",
  measurementId: "G-W4F4RL7ZRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export `auth` to use across files
