import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
import {getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDzsiNIu0Remgfu1DCupo-Ez5NErkfAx3k",
  authDomain: "cab-sample-8c0f5.firebaseapp.com",
  projectId: "cab-sample-8c0f5",
  storageBucket: "cab-sample-8c0f5.appspot.com",
  messagingSenderId: "648358416583",
  appId: "1:648358416583:web:cf2fbf45fe7345f285aee2"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const DB = getFirestore(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
