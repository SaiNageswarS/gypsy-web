import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD3COHmtJ5mKtI8mFACBrWPS1-vTNVIUiM",
    authDomain: "gypsy-web-3967a.firebaseapp.com",
    projectId: "gypsy-web-3967a",
    storageBucket: "gypsy-web-3967a.appspot.com",
    messagingSenderId: "436627740796",
    appId: "1:436627740796:web:ecff2e0c0dbbcb92ca51f9",
    measurementId: "G-TEFVN2B5EC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export { analytics, db };
