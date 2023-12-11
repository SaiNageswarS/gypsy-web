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
            <Grid container spacing={0}>
                <Grid xs={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-In" className='SearchDatePicker' />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Check-Out" className='SearchDatePicker' />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={4}>
                    <Button variant="contained" className='SearchButton'>Search</Button>
                </Grid>
            </Grid>
        </div>
    );
}


export default SearchInventory;
