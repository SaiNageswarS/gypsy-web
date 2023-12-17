import './App.css';
import * as React from 'react';

import { GetLoggedInUser } from './repo/LoginAndProfileRepo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import GypsyAppBar from './GypsyAppBar';
import Landing from './landing/Landing';
import Inventory from './inventory/Inventory';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    GetLoggedInUser().then((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }} className="App">
        <Grid container>
          <Grid xs={12}>
            <GypsyAppBar loggedInUser={user} />
          </Grid>
          <Grid xs={12}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/inventory" element={<Inventory />} />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
}

export default App;
