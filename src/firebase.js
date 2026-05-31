import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAVYq1J2WbYaJ2fWTVojyn2rnJATd3W7c",
  authDomain: "messenger-clone-455cd.firebaseapp.com",
  projectId: "messenger-clone-455cd",
  storageBucket: "messenger-clone-455cd.firebasestorage.app",
  messagingSenderId: "437689591164",
  appId: "1:437689591164:web:5f494580e5caf971a230f9",
  measurementId: "G-YF12C8B9Z8"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;