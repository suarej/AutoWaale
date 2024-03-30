import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmgTo8HpCAbGKk7rTTpj885G2dgHR-Pv0",
  authDomain: "cab-sample-c8316.firebaseapp.com",
  databaseURL: "https://cab-sample-c8316-default-rtdb.firebaseio.com",
  projectId: "cab-sample-c8316",
  storageBucket: "cab-sample-c8316.appspot.com",
  messagingSenderId: "753647184663",
  appId: "1:753647184663:web:b3c12746a20b878ed3a552",
  databaseURL: "https://cab-sample-c8316-default-rtdb.firebaseio.com/",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const DB = getDatabase(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
