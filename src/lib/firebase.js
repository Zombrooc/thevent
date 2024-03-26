// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLWB0izeVazrqtTi0FnTVnW4sToZrGnys",
  authDomain: "thevent-3a1a8.firebaseapp.com",
  projectId: "thevent-3a1a8",
  storageBucket: "thevent-3a1a8.appspot.com",
  messagingSenderId: "804987775083",
  appId: "1:804987775083:web:fdb3a0bfd6ece1533ce92e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
