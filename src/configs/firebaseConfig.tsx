import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://crud-app-movil-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);
