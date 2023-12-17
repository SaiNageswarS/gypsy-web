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
        await SaveProfile(user);
        return user;
    }

    // check if user is loggedIn
    const currentUser = auth.currentUser;
    if (currentUser !== null) {
        var profile = await GetProfile(currentUser.uid);
        return profile;
    }

    return null;
}

async function SaveProfile(user) {
    console.log("Saving", JSON.stringify(user));

    await setDoc(doc(db, "profile", user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL
    });
}

async function GetProfile(userId) {
    var profile = await getDoc(doc(db, "profile", userId));
    if (profile.exists()) {
        return profile.data();
    }

    return null;
}

export { Login, Logout, GetLoggedInUser };