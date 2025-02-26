import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQd8lhIwKUzKxICvAWRbN1HGz4fwzR7Mg",
  authDomain: "moonhack-2eac3.firebaseapp.com",
  projectId: "moonhack-2eac3",
  storageBucket: "moonhack-2eac3.firebasestorage.app",
  messagingSenderId: "580090459489",
  appId: "1:580090459489:web:3cf58444d3f18351e28120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore instance
const storage = getStorage(app); // Firebase Storage instance

export { db, storage };