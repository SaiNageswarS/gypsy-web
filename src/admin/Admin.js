import './Admin.css';
import * as React from 'react';

import { GetBookings } from '../repo/BookingRepo';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function Admin({ loggedInUser }) {
    const [currentDay, setCurrentDay] = React.useState(dayjs());
    const navigate = useNavigate();

    function newBooking() {
        navigate('/admin/booking/new');
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
            <div className="Admin">
                <Grid container spacing={0}>
                    <Grid xs={6} md={6}>
                        <h1>Bookings</h1>
                    </Grid>
                    <Grid xs={6} md={6}>
                        <div className='BookingDatePicker'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Booking-Date"
                                    format='DD-MMM-YYYY'
                                    value={currentDay}
                                    onChange={(newVal) => setCurrentDay(newVal)} />
                            </LocalizationProvider>
                        </div>
                    </Grid>
                </Grid>
                <Booking bookingDate={currentDay} />
                <div style={{ position: 'fixed', bottom: '62px', right: '52px', zIndex: 1000 }}>
                    <Fab color="primary" aria-label="add" onClick={newBooking}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}

function Booking({ bookingDate }) {
    const [bookings, setBookings] = React.useState({});

    React.useEffect(() => {
        GetBookings(bookingDate).then((bookings) => {
            setBookings(bookings);
        });
    }, [bookingDate]);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Booking<br />{bookingDate.format('DD-MMM-YYYY')}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(bookings).map((roomNum) => {
                    return (
                        <tr key={roomNum}>
                            <td>{roomNum}</td>
                            <td><GuestRoom guestList={bookings[roomNum]} /></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function GuestRoom({ guestList }) {
    return (
        <table>
            <tbody>
                {guestList.map((guest, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{guest.name}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Admin;