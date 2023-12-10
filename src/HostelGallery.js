import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import './App.css';

function HostelGallery() {
    return (
        <Grid container spacing={0}>
            <Grid xs={12}>
                <img src='img/1.jpg' style={{ maxWidth: "100%" }}></img>
            </Grid>
            <Grid xs={6}>
                <img src='img/2.jpg' style={{ maxWidth: "100%" }}></img>
            </Grid>
            <Grid xs={6}>
                <img src='img/3.jpg' style={{ maxWidth: "100%" }}></img>
            </Grid>
            <Grid xs={12}>
                <img src='img/7.jpg' style={{ maxWidth: "100%" }}></img>
            </Grid>
            <Grid xs={12}>
                <img src='img/5.jpg' style={{ maxWidth: "100%" }}></img>
            </Grid>
        </Grid>
    );
}

export default HostelGallery;
