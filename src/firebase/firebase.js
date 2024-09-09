// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCr8dyyeJ-SA0J7mDR6_ZFBPAInq97ZmHE",
  authDomain: "gokuryeo-hakwon.firebaseapp.com",
  databaseUrl: "https://gokuryeo-hakwon-default-rtdb.firebaseio.com/",
  projectId: "gokuryeo-hakwon",
  storageBucket: "gokuryeo-hakwon.appspot.com",
  messagingSenderId: "955823620148",
  appId: "1:955823620148:web:6f7ed262face197b324a61",
  measurementId: "G-G44SRLD445"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

console.log("Firebase initialized app: ", app);
console.log("Firebase auth initialized: ", auth);

export { app, auth };
