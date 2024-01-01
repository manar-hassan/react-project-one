// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from 'firebase/storage';
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeOdjI_Ka8Cqaddmsp4DwZS3bx3Mt2xI4",
  authDomain: "react-project-one-36727.firebaseapp.com",
  projectId: "react-project-one-36727",
  storageBucket: "react-project-one-36727.appspot.com",
  messagingSenderId: "138011641603",
  appId: "1:138011641603:web:5188db23e6bd144d6e8b36",
  measurementId: "G-9K6ZJ9BR72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);