import './App.css';
import * as React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';

const provider = new GoogleAuthProvider();

function GypsyAppBar() {
    const [user, setUser] = useState(null);

    function FirebaseLogin() {
        const auth = getAuth();
        signInWithRedirect(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const resUser = result.user;
                setUser(resUser);
                console.log("Logged in user: " + JSON.stringify(resUser));
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    function HeaderActions({ loggedInUser }) {
        if (loggedInUser === null) {
            return (
                <div className="HeaderActions">
                    <Button variant="contained" onClick={FirebaseLogin}>Login</Button>
                </div>
            );
        }

        return (
            <div className="HeaderActions">
                <img src={loggedInUser.photoURL} alt={loggedInUser.displayName} className="UserAvatar" />
            </div>
        );
    }

    return (
        <Grid container alignItems="center" spacing={2} sx={{ minHeight: "90px" }} className="AppBar">
            <Grid xs={6} md={9}>
                <span className='BrandLogo'>
                    <svg id="brandHeader" width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.03198 3.80281V7.07652L3.86083 9.75137L0.689673 12.4263L0.667474 6.56503C0.655304 3.34138 0.663875 0.654206 0.686587 0.593579C0.71907 0.506918 1.4043 0.488223 3.87994 0.506219L7.03198 0.529106V3.80281ZM21.645 4.36419V5.88433L17.0383 9.76316C14.5046 11.8966 11.2263 14.6552 9.75318 15.8934L7.07484 18.145V20.3225V22.5H3.85988H0.64502L0.667303 18.768L0.689673 15.036L2.56785 13.4609C3.60088 12.5946 6.85989 9.85244 9.81009 7.36726L15.1741 2.84867L18.4096 2.8464L21.645 2.84413V4.36419ZM21.645 15.5549V22.5H18.431H15.217V18.2638V14.0274L15.4805 13.7882C15.8061 13.4924 21.5939 8.61606 21.6236 8.61248C21.6353 8.61099 21.645 11.7351 21.645 15.5549Z" fill="currentColor"></path>
                    </svg>
                </span>
                <span className="BrandName"> Gypsy Nest </span>
            </Grid>
            <Grid xs={6} md={3}>
                <HeaderActions loggedInUser={user} />
            </Grid>
        </Grid>
    );
}

export default GypsyAppBar;