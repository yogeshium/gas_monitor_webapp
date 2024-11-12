import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getMessaging } from "firebase/messaging";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDP03W8RVlJzrGtlrT-00ZjOgytSkk96yM",
  authDomain: "iot-project-169dd.firebaseapp.com",
  databaseURL: "https://iot-project-169dd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-project-169dd",
  storageBucket: "iot-project-169dd.firebasestorage.app",
  messagingSenderId: "98722196139",
  appId: "1:98722196139:web:a3fd61f4b92ed8181065ee",
  measurementId: "G-09JG05SPWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const database = getDatabase(app);
const messaging = getMessaging(app);
export { database, messaging};