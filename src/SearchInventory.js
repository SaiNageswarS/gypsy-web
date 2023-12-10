import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

function SearchInventory() {
    return (
        <div className="SearchInventory">
            <Grid container spacing={2}>
                <Grid xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-In" />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-Out" />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={4}>
                    <TextField id="numAdults" label="Num Adults" variant="outlined" />
                </Grid>
            </Grid>
            <div className='SearchButton'>
                <Button variant="contained" size='large'>Search</Button>
            </div>
        </div>
    );
}


export default SearchInventory;
