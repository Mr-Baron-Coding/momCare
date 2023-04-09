import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyByRH2EOaiJHl15BSlF8EOILN2fa0VGTgA",
  authDomain: "momcare-bc985.firebaseapp.com",
  projectId: "momcare-bc985",
  storageBucket: "momcare-bc985.appspot.com",
  messagingSenderId: "1042586641515",
  appId: "1:1042586641515:web:84c64debc661ee40857d2e",
  measurementId: "G-NPZH7VJHYB",
  dataBaseURL: 'https://momcare-bc985-default-rtdb.firebaseio.com/'
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;