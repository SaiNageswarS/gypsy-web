import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import GypsyAppBar from './GypsyAppBar';
import HostelGallery from './HostelGallery';
import SearchInventory from './SearchInventory';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }} className="App">
      <Grid container>
        <Grid xs={12}>
          <GypsyAppBar />
        </Grid>
        <Grid xs={12}>
          <Intro />
        </Grid>
      </Grid>
    </Box>
  );
}

function Intro() {
  return (
    <Grid container>
      <Grid xs={12} md={8}>
        <div className="IntroText">
          Gypsy Nest — Backpapers haven on Budget.
        </div>
        <SearchInventory />
      </Grid>
      <Grid xs={12} md={4}>
        <div className='ImageList'>
          <HostelGallery />
        </div>
      </Grid>
    </Grid>
  );
}


export default App;
