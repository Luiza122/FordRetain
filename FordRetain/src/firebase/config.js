import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDRtlFUAB3SdUX8IzTV_C0IjT5l00a_HJc",
  authDomain: "fiap-auth-app-2.firebaseapp.com",
  databaseURL: "https://fiap-auth-app-2-default-rtdb.firebaseio.com",
  projectId: "fiap-auth-app-2",
  storageBucket: "fiap-auth-app-2.firebasestorage.app",
  messagingSenderId: "366408719986",
  appId: "1:366408719986:web:4024c2d2e250c45694aceb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };