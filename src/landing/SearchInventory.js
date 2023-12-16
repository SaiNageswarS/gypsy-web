import './Landing.css';
import * as React from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function SearchInventory() {
    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs().add(2, 'day'));
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/inventory?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}`);
    }

    return (
        <div className="SearchInventory">
            <Grid container spacing={0}>
                <Grid xs={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Check-In"
                            className='SearchDatePicker'
                            format='DD-MMM-YYYY'
                            value={startDate}
                            onChange={(newVal) => setStartDate(newVal)} />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Check-Out"
                            className='SearchDatePicker'
                            format='DD-MMM-YYYY'
                            value={endDate}
                            onChange={(endDate) => setEndDate(endDate)} />
                    </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={4}>
                    <Button variant="contained" className='SearchButton' onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>
        </div>
    );
}


export default SearchInventory;
