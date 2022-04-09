// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD03bzL3JjH3CEQNYOinCghUA-AeWPCnXs",
  authDomain: "wibu-image.firebaseapp.com",
  projectId: "wibu-image",
  storageBucket: "wibu-image.appspot.com",
  messagingSenderId: "54370664129",
  appId: "1:54370664129:web:8f43a2ddd712a951469e40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;