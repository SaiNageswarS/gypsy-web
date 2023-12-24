import { db } from "./FirebaseApp.js";
import { doc, collection, setDoc, addDoc, getDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import { GetOccupancy } from "./OccupancyRepo.js";

async function SaveBooking(checkInDate, checkOutDate, bookingId, bookingData) {
    // if existing booking, just set booking.
    if (bookingId !== null) {
        const bookingRef = doc(db, "booking", bookingId);
        await setDoc(bookingRef, bookingData);
        return;
    }

    // else create new booking and update occupancy.
    const bookingRef = await addDoc(collection(db, "booking"), bookingData);
    console.log("Booking saved with ID: ", bookingRef.id);

    // iterate from checkInDate to checkOutDate to update occupancy.
    for (var date = dayjs(checkInDate); date.isBefore(checkOutDate); date = date.add(1, 'day')) {
        var key = date.format('YYYYMMDD');
        var currentOccupancy = await GetOccupancy(date);
        if (currentOccupancy === null) {
            currentOccupancy = {};
        }

        if (currentOccupancy[bookingData.roomNumber] === undefined || currentOccupancy[bookingData.roomNumber] === null) {
            currentOccupancy[bookingData.roomNumber] = [];
        }

        currentOccupancy[bookingData.roomNumber].push(bookingRef);

        await setDoc(doc(db, "occupancy", key), currentOccupancy);
    }
}

async function GetBooking(bookingId) {
    const bookingRef = doc(db, "booking", bookingId);
    const bookingDoc = await getDoc(bookingRef);
    if (bookingDoc.exists()) {
        return bookingDoc.data();
    }

    return null;
}

export { SaveBooking, GetBooking };