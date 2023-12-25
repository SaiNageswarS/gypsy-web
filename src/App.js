import './App.css';
import * as React from 'react';

import { IsAdmin, Login, Logout } from './repo/LoginAndProfileRepo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Link from '@mui/material/Link';

import Landing from './landing/Landing';
import Inventory from './inventory/Inventory';
import Admin from './admin/Admin';
import NewBooking from './admin/NewBooking';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      user.isAdmin = await IsAdmin(user.uid);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    Login().then((user) => {
      setUser(user);
    });
  };

  function GypsyAppBar() {
    const navigate = useNavigate();

    const handleClickOnLogo = () => {
      // Navigate to the desired route when the span is clicked
      navigate('/');
    };

    return (
      <Grid container alignItems="center" spacing={2} sx={{ minHeight: "90px" }} className="AppBar">
        <Grid xs={6} md={9} style={{ padding: '25px' }}>
          <span className="BrandName" onClick={handleClickOnLogo} style={{ cursor: 'pointer' }}> Gypsy Nest </span>
        </Grid>
        <Grid xs={6} md={3}>
          <HeaderActions />
        </Grid>
      </Grid>
    );
  }

  function HeaderActions() {
    if (user === null) {
      return (
        <div className="HeaderActions">
          <Button variant="contained" onClick={() => handleLogin()}>Login</Button>
        </div>
      );
    }
    else {
      return (
        <UserAvatar loggedInUser={user} />
      );
    }
  }

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }} className="App">
        <Grid container>
          <Grid xs={12}>
            <GypsyAppBar />
          </Grid>
          <Grid xs={12}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/admin" element={<Admin loggedInUser={user} />} />
              <Route path="/admin/booking/new" element={<NewBooking loggedInUser={user} />} />
            </Routes>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
}

function UserAvatar({ loggedInUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openUserActionsPopUp = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserActionsPopUp = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="HeaderActions">
      <img
        src={loggedInUser.photoURL}
        alt={loggedInUser.displayName}
        className="UserAvatar"
        onClick={openUserActionsPopUp}
        aria-describedby={id} />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closeUserActionsPopUp}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <div className='userPopover'>
          <UserMenu IsAdmin={loggedInUser.isAdmin} />
        </div>
      </Popover>
    </div>
  );
}

function UserMenu({ IsAdmin }) {
  const navigate = useNavigate();

  return (
    <ul>
      {IsAdmin && <li><Link href="#" onClick={() => navigate('/admin')}>Admin</Link></li>}
      <li><Link href="#" onClick={Logout}>Logout</Link></li>
    </ul>
  );
}

export default App;
