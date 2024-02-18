import './Admin.css';
import * as React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { GetOccupancy, RefreshOccupancy, GetRoomList, RoomCapacity } from '../repo/OccupancyRepo';

function RoomOccupancy({ loggedInUser }) {
    const [searchParams] = useSearchParams();
    var occDate = searchParams.get('occDate');
    if (occDate === null) {
        occDate = dayjs();
    }
    else {
        occDate = dayjs(occDate);
    }

    function setOccDate(newDate) {
        navigate(`/admin/occupancy?occDate=${newDate.format('YYYY-MM-DD')}`);
    }

    const tabIdx = 0;
    const navigate = useNavigate();

    function newBooking() {
        navigate('/admin/booking/new');
    }

    function handleTabChange(event, newTabIdx) {
        if (newTabIdx === 0) {
            navigate('/admin/occupancy');
        }
        else if (newTabIdx === 1) {
            navigate('/admin/cashsheet');
        }
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
                <Tabs value={tabIdx} onChange={handleTabChange} aria-label="admin tabs">
                    <Tab label="Occupancy" />
                    <Tab label="Cash Sheet" />
                </Tabs>
                <Grid container spacing={0}>
                    <Grid xs={5} md={5}>
                        <h1>Bookings</h1>
                    </Grid>
                    <Grid xs={1} md={1} style={{ padding: '20px 0 20px 0' }}>
                        <IconButton aria-label="back" onClick={() => setOccDate(occDate.add(-1, 'day'))}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid xs={5} md={5} style={{ textAlign: 'center' }}>
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
                    <Grid xs={1} md={1} style={{ padding: '20px 0 20px 0' }}>
                        <IconButton aria-label="forward" onClick={() => setOccDate(occDate.add(1, 'day'))}>
                            <ArrowForwardIcon />
                        </IconButton>
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
    const [prevOccupancy, setPrevOccupancy] = React.useState({});

    React.useEffect(() => {
        setOccupancy({});
        setPrevOccupancy({});

        GetOccupancy(inputDate).then((occupancy) => {
            setOccupancy(occupancy);
        });

        GetOccupancy(inputDate.add(-1, 'day')).then((occupancy) => {
            setPrevOccupancy(occupancy);
        });
    }, [inputDate]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Booking<br />{inputDate.add(-1, 'day').format('DD-MMM-YYYY')}</TableCell>
                        <TableCell>Booking<br />{inputDate.format('DD-MMM-YYYY')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {GetRoomList().map((roomNumKey, roomIdx) => {
                        return (
                            <TableRow key={roomIdx}>
                                {
                                    (roomNumKey['idx'] === 0) &&
                                    <TableCell rowSpan={RoomCapacity[roomNumKey['roomNumber']]}>
                                        <div>{roomNumKey['roomNumber']}</div>
                                        <div
                                            className='occupancyPct'
                                            style={{ backgroundColor: (getOccupancyCnt(occupancy[roomNumKey['roomNumber']]) >= RoomCapacity[roomNumKey['roomNumber']]) ? '#ff0000' : '#00ff00' }}
                                        >
                                            {getOccupancyCnt(occupancy[roomNumKey['roomNumber']])}/{RoomCapacity[roomNumKey['roomNumber']]}
                                        </div>
                                    </TableCell>
                                }
                                <TableCell style={{ padding: 0, backgroundColor: getGuestColorCode(prevOccupancy[roomNumKey['roomNumber']], roomNumKey['idx']) }}>
                                    <GuestDetail guestList={prevOccupancy[roomNumKey['roomNumber']]} idx={roomNumKey['idx']} />
                                </TableCell>
                                <TableCell style={{ padding: 0, backgroundColor: getGuestColorCode(occupancy[roomNumKey['roomNumber']], roomNumKey['idx']) }}>
                                    <GuestDetail guestList={occupancy[roomNumKey['roomNumber']]} idx={roomNumKey['idx']} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function GuestDetail({ guestList, idx }) {
    const navigate = useNavigate();

    if (guestList === undefined || guestList === null || idx >= guestList.length) {
        return (<div></div>);
    }

    const guest = guestList[idx];

    return (
        <div className='GuestDetail'
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

function getGuestColorCode(guestList, idx) {
    if (guestList === undefined || guestList === null) {
        return '#FFFFFF';
    }

    const guest = guestList[idx];
    if (guest === undefined || guest === null) {
        return '#FFFFFF';
    }

    const checkedIn = guest.checkedIn;
    const checkedOut = guest.checkedOut;

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
        .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
    return occupiedBeds;
}

function getRoomRowSpan(prevGuestList, currentGuestList) {
    if (prevGuestList === undefined || prevGuestList === null) {
        prevGuestList = [];
    }

    if (currentGuestList === undefined || currentGuestList === null) {
        currentGuestList = [];
    }

    if (prevGuestList.length === 0 && currentGuestList.length === 0) {
        return 1;
    }

    var prevGuestCnt = prevGuestList.length;
    var currentGuestCnt = currentGuestList.length;

    if (prevGuestCnt >= currentGuestCnt) {
        return prevGuestCnt;
    }
    else {
        return currentGuestCnt;
    }
}


const bookingSrcIcon = {
    'booking.com': 'https://cf.bstatic.com/static/img/favicon/9ca83ba2a5a3293ff07452cb24949a5843af4592.svg',
    'hostelworld.com': 'https://www.hostelworld.com/favicon.ico',
    'agoda.com': 'https://www.agoda.com/favicon.ico',
    'goibibo/mmt': 'https://jsak.goibibo.com/pwa_v3/pwa_growth/images/favicon-96x96.2d2829e5.png',
    'airbnb.com': 'https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico',
    'walk-in': 'https://www.svgrepo.com/show/308152/walking-person-go-walk-move.svg'
};

export default RoomOccupancy;