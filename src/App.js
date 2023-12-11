import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';

import GypsyAppBar from './GypsyAppBar';
import HostelGallery from './HostelGallery';
import Intro from './Intro';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }} className="App">
      <Grid container>
        <Grid xs={12}>
          <GypsyAppBar />
        </Grid>
        <Grid xs={12}>
          <Landing />
        </Grid>
      </Grid>
    </Box>
  );
}

function Landing() {
  return (
    <Grid container>
      <Grid xs={12} md={6}>
        <div className='ImageList'>
          <HostelGallery />
        </div>
      </Grid>
      <Grid xs={12} md={6}>
        <Intro />
      </Grid>
    </Grid>
  );
}

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default App;
