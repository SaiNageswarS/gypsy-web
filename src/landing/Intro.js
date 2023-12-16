import './Landing.css';
import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import CasinoIcon from '@mui/icons-material/Casino';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import SearchInventory from './SearchInventory';

function Intro() {
    return (
        <div className="Intro">
            <Grid container>
                <Grid xs={12} md={12}>
                    <div className='IntroText'>
                        Gypsy Nest — Backpackers haven on Budget.
                    </div>
                </Grid>

                <Grid xs={3} md={3}>
                    <div className='IntroIcons'>
                        <NetworkWifiIcon fontSize='large' color="secondary" />
                    </div>
                    <div className='IntroIcons'>
                        <Typography variant='body2' color="secondary">
                            Free Fast Wifi
                        </Typography>
                    </div>
                </Grid>
                <Grid xs={3} md={3}>
                    <div className='IntroIcons'>
                        <CasinoIcon fontSize='large' color="secondary" />
                    </div>
                    <div className='IntroIcons'>
                        <Typography variant='body2' color="secondary">
                            Fun Games
                        </Typography>
                    </div>
                </Grid>
                <Grid xs={3} md={3}>
                    <div className='IntroIcons'>
                        <AcUnitIcon fontSize='large' color="secondary" />
                    </div>
                    <div className='IntroIcons'>
                        <Typography variant='body2' color="secondary">
                            Air Conditioned<br /> Rooms
                        </Typography>
                    </div>
                </Grid>
                <Grid xs={3} md={3}>
                    <div className='IntroIcons'>
                        <a href='https://www.google.com/search?q=gypsy+nest'>
                            <GoogleIcon fontSize='large' color='primary' />
                        </a>
                    </div>
                    <div className='IntroIcons'>
                        <Typography variant='body1' color="primary">
                            4.6/5<br />(128 Reviews)
                        </Typography>
                    </div>
                </Grid>

                <Grid xs={12} md={12}>
                    <SearchInventory />
                </Grid>

            </Grid>
        </div>
    );
}

export default Intro;