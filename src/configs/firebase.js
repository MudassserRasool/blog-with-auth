import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDimHAnpzBUXTfG9vuya5JLTR7sbLJAwRg",
    authDomain: "nextjs-authentication-68453.firebaseapp.com",
    projectId: "nextjs-authentication-68453",
    storageBucket: "nextjs-authentication-68453.appspot.com",
    messagingSenderId: "362189979646",
    appId: "1:362189979646:web:32f8cd7eba10afa8f38aaf"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;