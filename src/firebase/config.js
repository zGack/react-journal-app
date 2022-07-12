// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getEnvironments } from '../helpers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Main
// const firebaseConfig = {
//   apiKey: "AIzaSyA4RuFIyS7rvgv_w_KoskFXt0MxoJmssnU",
//   authDomain: "journal-app-ec5aa.firebaseapp.com",
//   projectId: "journal-app-ec5aa",
//   storageBucket: "journal-app-ec5aa.appspot.com",
//   messagingSenderId: "39238642502",
//   appId: "1:39238642502:web:6a1e7d04058e8b36449347"
// };

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINSENDERID,
  VITE_APPID
} = getEnvironments();

// test
// const firebaseConfig = {
//   apiKey: "AIzaSyAwjI8GpiD9tkP_TZ_Atgv7gtiuMz-PsiM",
//   authDomain: "journal-app-testing-72944.firebaseapp.com",
//   projectId: "journal-app-testing-72944",
//   storageBucket: "journal-app-testing-72944.appspot.com",
//   messagingSenderId: "1050323942342",
//   appId: "1:1050323942342:web:1c99ba461087dd338b90c7"
// };

const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINSENDERID,
  appId: VITE_APPID 
}

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB   = getFirestore(FirebaseApp);

