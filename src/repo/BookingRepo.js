import { db } from "./FirebaseApp.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dayjs from 'dayjs';

async function GetBookings(bookingDate) {
    console.log("Getting bookings for", bookingDate);

    var key = dayjs(bookingDate).format('YYYYMMDD');
    const result = await getDoc(doc(db, "booking", key));

    if (!result.exists()) {
        return {};
    }

    console.log("result", result.data());
    return result.data();
}

async function SaveBooking(checkInDate, checkOutDate, bookingData) {
    // iterate from checkInDate to checkOutDate
    for (var date = dayjs(checkInDate); date.isBefore(checkOutDate); date = date.add(1, 'day')) {
        var key = date.format('YYYYMMDD');
        var currentBooking = await GetBookings(date);
        if (currentBooking === null) {
            currentBooking = {};
        }

        if (currentBooking[bookingData.roomNumber] === undefined || currentBooking[bookingData.roomNumber] === null) {
            currentBooking[bookingData.roomNumber] = [];
        }

        currentBooking[bookingData.roomNumber].push({
            name: bookingData.name,
            src: bookingData.source,
            numBeds: bookingData.numberOfBeds,
            amnt: bookingData.amountPending,
            checkedIn: false,
            checkedOut: false,
        });

        await setDoc(doc(db, "booking", key), currentBooking);
    }
}

export { GetBookings, SaveBooking };