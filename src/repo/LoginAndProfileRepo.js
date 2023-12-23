import { db } from "./FirebaseApp.js";
import { getAuth, signOut, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function Login() {
    console.log("Initiating login");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithRedirect(auth, provider);
}

async function Logout() {
    const auth = getAuth();
    await signOut(auth);
}

async function GetLoggedInUser() {
    const auth = getAuth();
    var result = await getRedirectResult(auth);
    if (result !== null && result.user !== null) {
        const user = result.user;
        await saveProfile(user);
        user.isAdmin = await isAdmin();
        return user;
    }

    // check if user is loggedIn
    const currentUser = auth.currentUser;
    if (currentUser !== null) {
        var profile = await getProfile(currentUser.uid);
        profile.isAdmin = await isAdmin();
        return profile;
    }

    return null;
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

async function isAdmin() {
    var userId = getAuth()?.currentUser?.uid;
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

export { Login, Logout, GetLoggedInUser };