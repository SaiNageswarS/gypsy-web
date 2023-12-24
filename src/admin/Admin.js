import './Admin.css';
import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { GetOccupancy, RoomList } from '../repo/OccupancyRepo';

function Admin({ loggedInUser }) {
    const [occDate, setOccDate] = React.useState(dayjs());
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
                        <div className='OccupancyDatePicker'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Occ-Date"
                                    format='DD-MMM-YYYY'
                                    value={occDate}
                                    onChange={(newVal) => setOccDate(newVal)} />
                            </LocalizationProvider>
                        </div>
                    </Grid>
                </Grid>
                <Occupancy inputDate={occDate} />
                <div style={{ position: 'fixed', bottom: '62px', right: '52px', zIndex: 1000 }}>
                    <Fab color="primary" aria-label="add" onClick={newBooking}>
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        );
    }
}

function Occupancy({ inputDate }) {
    const [occupancy, setOccupancy] = React.useState({});

    React.useEffect(() => {
        GetOccupancy(inputDate).then((occupancy) => {
            setOccupancy(occupancy);
        });
    }, [inputDate]);

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Booking<br />{inputDate.format('DD-MMM-YYYY')}</th>
                </tr>
            </thead>
            <tbody>
                {RoomList.map((roomNum) => {
                    return (
                        <tr key={roomNum}>
                            <td>
                                <div className='roomNum'>{roomNum}</div>
                                <div
                                    className='occupancyPct'
                                    style={{ backgroundColor: (getOccupancyCnt(occupancy[roomNum]) >= roomCapacity[roomNum]) ? '#ff0000' : '#00ff00' }}
                                >
                                    {getOccupancyCnt(occupancy[roomNum])}/{roomCapacity[roomNum]}
                                </div>
                            </td>
                            <td style={{ padding: 0 }}><GuestRoom guestList={occupancy[roomNum]} /></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function GuestRoom({ guestList }) {
    if (guestList === undefined || guestList === null) {
        guestList = [];
    }

    console.log('GuestRoom');
    console.log(guestList);

    return (
        <table>
            <tbody>
                {guestList.map((guest, idx) => {
                    return (
                        <tr key={idx}>
                            <td style={{ padding: 0 }}><GuestDetail guest={guest} /></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

function GuestDetail({ guest }) {
    const navigate = useNavigate();

    return (
        <div className='GuestDetail'
            style={{ backgroundColor: getGuestColorCode(guest.checkedIn, guest.checkedOut) }}
            onClick={() => { navigate(`/admin/booking/new?bookingId=${guest.id}`) }}
        >
            <Grid container spacing={0}>
                <Grid xs={2} md={2}>
                    <img src={bookingSrcIcon[guest.src]} alt={guest.source} />
                </Grid>
                <Grid xs={8} md={8}>
                    <div className="GuestName">{guest.name}</div>
                </Grid>
                <Grid xs={6} md={6}>
                    <div className='AmntPending' style={{ color: (guest.amountPending > 0) ? '#ff7f00' : '#00aa00' }}>
                        INR {guest.amountPending}
                    </div>
                </Grid>
                <Grid xs={6} md={6}>
                    <div className='numBeds'>Beds: {guest.numberOfBeds}</div>
                </Grid>
            </Grid>
        </div>
    );
}

function getGuestColorCode(checkedIn, checkedOut) {
    if (checkedIn === true && checkedOut === false) {
        return '#FFCDD2';
    }
    else if (checkedIn === true && checkedOut === true) {
        return '#FF00FF';
    }
    else {
        return '#FFFF00';
    }
}

function getOccupancyCnt(guestList) {
    if (guestList === undefined || guestList === null || guestList.length === 0) {
        return 0;
    }

    var occupiedBeds = guestList
        .filter(guest => guest.checkedOut === false)
        .map(guest => guest.numberOfBeds)
        .reduce((a, b) => a + b, 0);
    return occupiedBeds;
}

const roomCapacity = { "101": 1, "102": 1, "103": 1, "104": 8, "201": 6, "202": 6, "203": 6, "204": 8, "301": 1, "302": 1, "303": 1, "304": 1 };


const bookingSrcIcon = {
    'booking.com': 'https://cf.bstatic.com/static/img/favicon/9ca83ba2a5a3293ff07452cb24949a5843af4592.svg',
    'hostelworld.com': 'https://www.hostelworld.com/favicon.ico',
    'agoda.com': 'https://www.agoda.com/favicon.ico',
    'goibibo/mmt': 'https://jsak.goibibo.com/pwa_v3/pwa_growth/images/favicon-96x96.2d2829e5.png',
    'airbnb.com': 'https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico',
    'walk-in': 'https://www.svgrepo.com/show/308152/walking-person-go-walk-move.svg'
};

export default Admin;