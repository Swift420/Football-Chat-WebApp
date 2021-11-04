

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import 'firebase/auth';

import * as firebase from 'firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCkjydfryZThw1zW1UAlp-oKYmonN0hnFw",
    authDomain: "slack-clone-7b6a9.firebaseapp.com",
    projectId: "slack-clone-7b6a9",
    storageBucket: "slack-clone-7b6a9.appspot.com",
    messagingSenderId: "738021950792",
    appId: "1:738021950792:web:86bb62b7caaf2a6faf9f7d",
    measurementId: "G-YWWTG2P9B0"
  };


  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  

  export { auth, db, provider };

 
