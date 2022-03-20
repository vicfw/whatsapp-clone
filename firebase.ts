// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: 'whatsapp-clone-2aa9c.firebaseapp.com',
  projectId: 'whatsapp-clone-2aa9c',
  storageBucket: 'whatsapp-clone-2aa9c.appspot.com',
  messagingSenderId: '391869676203',
  appId: '1:391869676203:web:7174188aea8e5ddbb095ee',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
