import { db } from "./FirebaseApp.js";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function Login() {
    console.log("Initiating login");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    if (result !== null && result.user !== null) {
        const user = result.user;
        // allow overwrite to update profile pic etc. as per google.
        await saveProfile(user);
        user.isAdmin = await IsAdmin(user.uid);
        return user;
    }

    return null;
}

async function Logout() {
    const auth = getAuth();
    await signOut(auth);
    // Reload the current page
    window.location.reload();
}

async function saveProfile(user) {
    console.log("Saving", JSON.stringify(user));

    await setDoc(doc(db, "profile", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL
    });
}

async function getProfile(userId) {
    var profile = await getDoc(doc(db, "profile", userId));
    if (profile.exists()) {
        return profile.data();
    }

    return null;
}

/**
 * IsAdmin is maintained in separate collection in firestore with no write access.
 * @returns 
 */
async function IsAdmin(userId) {
    var result = false;

    if (userId === null || userId === undefined) {
        return false;
    }

    var config = await getDoc(doc(db, "config", "default"));
    if (config.exists()) {
        var admins = config.data().admins;
        result = admins.includes(userId);
    }

    console.log("Is Admin: ", result);
    return result;
}

export { Login, Logout, IsAdmin };