import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD2OqeVXVSSGD6lzLCciJiLo4Ljq5FOQVw",
    authDomain: "disney-clone-6028d.firebaseapp.com",
    projectId: "disney-clone-6028d",
    storageBucket: "disney-clone-6028d.appspot.com",
    messagingSenderId: "400154112719",
    appId: "1:400154112719:web:e45f5119bfecc6f85abdba",
    measurementId: "G-S7K7MQ7SPT"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;