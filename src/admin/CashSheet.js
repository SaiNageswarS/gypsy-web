import './Admin.css';
import * as React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { GetCashSheet } from '../repo/CashsheetRepo';

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
        month = new Date().toLocaleString('default', { month: 'short' });
    }

    if (year === null) {
        year = new Date().getFullYear();
    }

    function newExpense() {
        navigate('/admin/expense/new');
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
                    <Grid xs={6} md={6}>
                        <h1>Cash Sheet</h1>
                    </Grid>
                    <Grid xs={6} md={6} style={{ textAlign: 'right', paddingRight: '8px' }}>
                        <MonthYearSelector selectedMonth={month} selectedYear={year} />
                    </Grid>
                </Grid>

                <CashSheetTable selectedMonth={month} selectedYear={year} />
                <div style={{ position: 'fixed', bottom: '62px', right: '52px', zIndex: 1000 }}>
                    <Fab color="primary" aria-label="add" onClick={newExpense}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}

function CashSheetTable({ selectedMonth, selectedYear }) {
    const [cashSheet, setCashSheet] = React.useState([]);

    React.useEffect(() => {
        setCashSheet([]);
        GetCashSheet(selectedMonth, selectedYear).then((data) => {
            setCashSheet(data);
        });
    }, [selectedMonth, selectedYear]);

    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={6} md={6}>
                    <h2>{selectedMonth} {selectedYear}</h2>
                </Grid>
                <Grid xs={6} md={6} style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <h2>Total: INR {cashSheet.reduce((acc, row) => acc + parseFloat(row.amount), 0)}</h2>
                </Grid>
            </Grid>
            <table>
                <thead>
                    <tr>
                        <th>BookingId</th>
                        <th>Type</th>
                        <th>Income</th>
                    </tr>
                </thead>
                <tbody>
                    {cashSheet.map((row, index) => (
                        <tr key={index}>
                            <td>{row.bookingId}</td>
                            <td>{row.type}</td>
                            <td>INR {row.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function MonthYearSelector({ selectedMonth, selectedYear }) {
    const navigate = useNavigate();

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];

    const handleMonthChange = function (newMonth) {
        navigate(`/admin/cashSheet?month=${newMonth}&year=${selectedYear}`);
    };

    const handleYearChange = function (newYear) {
        navigate(`/admin/cashSheet?month=${selectedMonth}&year=${newYear}`);
    };

    return (
        <div>
            <FormControl style={{ padding: '10px 2px' }}>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                    labelId="month-select-label"
                    id="month-select"
                    value={selectedMonth}
                    onChange={(e) => handleMonthChange(e.target.value)}
                >
                    {months.map((month, index) => (
                        <MenuItem key={index} value={month}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl style={{ padding: '10px 2px' }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => handleYearChange(e.target.value)}
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
