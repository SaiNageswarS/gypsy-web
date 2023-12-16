import './App.css';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { GetLoggedInUser } from './repo/LoginAndProfile';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import GypsyAppBar from './GypsyAppBar';
import Landing from './landing/Landing';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GetLoggedInUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} className="App">
      <Grid container>
        <Grid xs={12}>
          <GypsyAppBar loggedInUser={user} />
        </Grid>
        <Grid xs={12}>
          <Landing />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
