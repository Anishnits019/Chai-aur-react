import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQLr8jPoaQnX3-HU0BIyKwAMYZw65gD2I",
  authDomain: "shoppingcart-6d2bf.firebaseapp.com",
  projectId: "shoppingcart-6d2bf",
  storageBucket: "shoppingcart-6d2bf.appspot.com",
  messagingSenderId: "115000533775",
  appId: "1:115000533775:web:0a4e22bb15f1b626f4b91a",
  databaseURL: "https://shoppingcart-6d2bf-default-rtdb.firebaseio.com/", // Add this line

};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication
// const auth = getAuth(app);
// const database = getDatabase(app);
const app=initializeApp(firebaseConfig) // intialize firbase configuration 
const auth=getAuth(app);   // itnamead as app and form getAUTH(app) get Authentication feature
const database=getDatabase(app) // it get database feat

export { auth,database,app};
