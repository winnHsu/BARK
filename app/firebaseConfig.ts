// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaK-U3lRQH3ZkQxuDbFkohjY3sWuovK5g",
    authDomain: "bark-bfe8a.firebaseapp.com",
    projectId: "bark-bfe8a",
    storageBucket: "bark-bfe8a.appspot.com",
    messagingSenderId: "810795630435",
    appId: "1:810795630435:web:5a796d8be1366ec4535d56",
    measurementId: "G-QLMD8DNGJX"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_STORAGE = getStorage(FIREBASE_APP);