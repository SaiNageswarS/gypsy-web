import './Admin.css';
import * as React from 'react';
import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SaveBooking } from '../repo/BookingRepo';

function NewBooking({ loggedInUser }) {
    if (loggedInUser === null || loggedInUser === undefined || loggedInUser.isAdmin === false) {
        return (
            <div className="Admin">
                <h1>Admin</h1>
                <p>You must be an admin to view this page.</p>
            </div>
        );
    }

    return (
        <div className="NewBooking">
            <h1>New Booking</h1>
            <RoomBookingForm />
        </div>
    );
}

function RoomBookingForm() {
    const [formData, setFormData] = React.useState({
        name: '',
        roomNumber: '',
        checkInDate: '',
        checkOutDate: '',
        source: '',
        numberOfBeds: 1,
        amountPending: 0,
    });

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isSubmitting) {
            setIsSubmitting(true);
            SaveBooking(formData.checkInDate, formData.checkOutDate, formData).then(() => {
                setIsSubmitting(false);
                navigate('/admin');
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel>Room Number</InputLabel>
                        <Select
                            name="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="101">101</MenuItem>
                            <MenuItem value="102">102</MenuItem>
                            <MenuItem value="103">103</MenuItem>
                            <MenuItem value="104">104</MenuItem>
                            <MenuItem value="201">201</MenuItem>
                            <MenuItem value="202">202</MenuItem>
                            <MenuItem value="203">203</MenuItem>
                            <MenuItem value="204">204</MenuItem>
                            <MenuItem value="301">301</MenuItem>
                            <MenuItem value="302">302</MenuItem>
                            <MenuItem value="303">303</MenuItem>
                            <MenuItem value="304">304</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <TextField
                        fullWidth
                        label="Check-in Date"
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                    <TextField
                        fullWidth
                        label="Check-out Date"
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleInputChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel>Source</InputLabel>
                        <Select
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                        >
                            <MenuItem value="booking.com">Booking.com</MenuItem>
                            <MenuItem value="hostelworld.com">HostelWorld.com</MenuItem>
                            <MenuItem value="airbnb.com">airbnb.com</MenuItem>
                            <MenuItem value="walk-in">Walk-in</MenuItem>
                            <MenuItem value="goibibo/mmt">Go-Ibibo/MMT</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        fullWidth
                        label="Number of Beds"
                        type="number"
                        name="numberOfBeds"
                        value={formData.numberOfBeds}
                        onChange={handleInputChange}
                        inputProps={{
                            min: 1,
                            max: 8,
                        }}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <TextField
                        fullWidth
                        label="amountPending"
                        type="number"
                        name="Amount Pending"
                        value={formData.amountPending}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ height: '60px' }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ height: '60px' }}
                        onClick={() => navigate('/admin')}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default NewBooking;
