import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBI8fIQVcDHyAADEzA0uZODnJXtP-cmj40",
    authDomain: "todos-6aaee.firebaseapp.com",
    projectId: "todos-6aaee",
    storageBucket: "todos-6aaee.appspot.com",
    messagingSenderId: "880189881968",
    appId: "1:880189881968:web:b3e547ca3b091ccc0f7eb5",
    measurementId: "G-KR3WYTQ6TP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);