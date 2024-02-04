import './Admin.css';
import * as React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CashSheet({ loggedInUser }) {
    const [searchParams] = useSearchParams();
    var month = searchParams.get('month');
    var year = searchParams.get('year');

    const tabIdx = 1;
    const navigate = useNavigate();

    function handleTabChange(event, newTabIdx) {
        if (newTabIdx === 0) {
            navigate('/admin/occupancy');
        }
        else if (newTabIdx === 1) {
            navigate('/admin/cashsheet');
        }
    }

    if (month === null) {
        month = new Date().toLocaleString('default', { month: 'long' });
    }

    if (year === null) {
        year = new Date().getFullYear();
    }

    if (loggedInUser === null || loggedInUser === undefined || loggedInUser.isAdmin === false) {
        return (
            <div className="Admin">
                <h1>Admin</h1>
                <p>You must be an admin to view this page.</p>
            </div>
        );
    }
    else {
        return (
            <div className="CashSheet">
                <Tabs value={tabIdx} onChange={handleTabChange} aria-label="admin tabs">
                    <Tab label="Occupancy" />
                    <Tab label="Cash Sheet" />
                </Tabs>
                <Grid container spacing={0}>
                    <Grid xs={5} md={5}>
                        <h1>Cash Sheet</h1>
                    </Grid>
                    <Grid xs={7} md={7} style={{ textAlign: 'center' }}>
                        <MonthYearSelector selectedMonth={month} selectedYear={year} />
                    </Grid>
                </Grid>

            </div>
        );
    }
}

function MonthYearSelector({ selectedMonth, selectedYear }) {
    const navigate = useNavigate();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handleMonthChange = function (newMonth) {
        navigate(`/admin/cashSheet?month=${newMonth}&year=${selectedYear}`);
    };

    const handleYearChange = function (newYear) {
        navigate(`/admin/cashSheet?month=${selectedMonth}&year=${newYear}`);
    };

    return (
        <div>
            <FormControl style={{ padding: '10px 5px' }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    style={{ width: '120px' }}
                >
                    {months.map((month, index) => (
                        <MenuItem key={index} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl style={{ padding: '10px 5px' }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
                    style={{ width: '100px' }}
                >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                        <MenuItem key={year} value={year}>
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default CashSheet;
