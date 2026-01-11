// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in the Firebase Console -> Project Settings -> General -> Your apps
/* src/lib/firebase.js */
const firebaseConfig = {
  apiKey: "AIzaSyAjZ6mUmj0lIpMBUb-3T-dHEX3Qf8ikZ8s",
  authDomain: "artlynestudio001.firebaseapp.com",
  projectId: "artlynestudio001",
  storageBucket: "artlynestudio001.firebasestorage.app",
  messagingSenderId: "870131793190",
  appId: "1:870131793190:web:42e50152ab115642a355e7",
  measurementId: "G-YB4NLQWXCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
