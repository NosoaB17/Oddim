import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZS1pPXCs94-A14cExRnGQuRoG0g98yog",
  authDomain: "middoapp-4e2ad.firebaseapp.com",
  projectId: "middoapp-4e2ad",
  storageBucket: "middoapp-4e2ad.appspot.com",
  messagingSenderId: "513631922811",
  appId: "1:513631922811:web:743ab5ddafb0f39cf510de",
  measurementId: "G-DE09B6SPTN",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy các instance cần thiết
export const auth = getAuth(app);
export const db = getFirestore(app);

//Google OAuth
export const googleProvider = new GoogleAuthProvider();
