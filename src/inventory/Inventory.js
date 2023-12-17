import { useSearchParams } from 'react-router-dom';
import './Inventory.css';
import * as React from 'react';
import { GetBeds } from '../repo/InventoryRepo';

import Grid from '@mui/material/Unstable_Grid2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';

function Inventory() {
    const [searchParams] = useSearchParams();
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const [beds, setBeds] = React.useState([]);

    React.useEffect(() => {
        GetBeds(startDate, endDate).then((beds) => {
            setBeds(beds);
        });
    }, [startDate, endDate]);

    return (
        <div className="Inventory">
            <div className="InventoryHeader">
                <div className="InventoryHeaderTitle">Hostel Rooms</div>
                <div className="InventoryHeaderSubtitle">
                    <CalendarMonthIcon color="#31363f" /> {startDate} To {endDate}
                </div>
            </div>
            <div className="InventoryBody">
                {beds.map((bed) => {
                    return (
                        <Grid container spacing={0}>
                            <Grid xs={12} md={4}>
                                <div className="InventoryBedImageContainer">
                                    <img className="InventoryBedImage" src={bed.image} alt={bed.type} width="100%" />
                                </div>
                            </Grid>
                            <Grid xs={12} md={8}>
                                <div className='InventoryBedDetails'>
                                    <InventoryDescription bed={bed} />
                                </div>
                            </Grid>
                        </Grid>
                    );
                })}
            </div>
        </div>
    );
}

function InventoryDescription({ bed }) {
    return (
        <Grid container spacing={0}>
            <Grid xs={6} md={6}>
                <div className="InventoryBedTitle">{bed.type}</div>
                <div className="InventoryBedSubtitle">{bed.description}</div>
                <div className="InventoryBedSubtitle">Available Beds: {bed.beds}</div>
            </Grid>
            <Grid xs={6} md={6}>
                <div className='PriceDetails'>
                    <div className="InventoryPrice">INR {bed.price}</div>
                    <div className='InventoryPriceDescription'>Per Night</div>
                    <Button variant="contained" className='InventoryBookButton'>Book Now</Button>
                </div>
            </Grid>
        </Grid>
    );
}

export default Inventory;