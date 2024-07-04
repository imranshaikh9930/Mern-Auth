import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYnj60YQfZHg0dEZoUGMvrHCcflzq4Vjg",
  authDomain: "mernauth-a1ec0.firebaseapp.com",
  projectId: "mernauth-a1ec0",
  storageBucket: "mernauth-a1ec0.appspot.com",
  messagingSenderId: "602320797994",
  appId: "1:602320797994:web:e460425c056e0d55a7de53",
  measurementId: "G-PJ7X9F3BWM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);