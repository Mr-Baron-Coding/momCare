// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByRH2EOaiJHl15BSlF8EOILN2fa0VGTgA",
  authDomain: "momcare-bc985.firebaseapp.com",
  projectId: "momcare-bc985",
  storageBucket: "momcare-bc985.appspot.com",
  messagingSenderId: "1042586641515",
  appId: "1:1042586641515:web:84c64debc661ee40857d2e",
  measurementId: "G-NPZH7VJHYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const auth = getAuth(app);
export const auth = getAuth(app);
export default app;