import './Landing.css'
import * as React from 'react'

import Grid from '@mui/material/Unstable_Grid2';

import HostelGallery from './HostelGallery';
import Intro from './Intro';


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

export default Landing;