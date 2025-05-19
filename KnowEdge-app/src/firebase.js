import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-6VFr2CgORov8qlf_ee6q0IaAcYqUUpE",
    authDomain: "knowedge-4c33e.firebaseapp.com",
    projectId: "knowedge-4c33e",
    storageBucket: "knowedge-4c33e.firebasestorage.app",
    messagingSenderId: "545395009437",
    appId: "1:545395009437:web:65e79e410a4fee9fb2b174"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);