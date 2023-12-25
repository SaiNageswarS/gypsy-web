import { db } from "./FirebaseApp.js";
import { doc, collection, setDoc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import dayjs from 'dayjs';

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
        var currentOccupancyRes = await getDoc(doc(db, "occupancy", key));
        var currentOccupancy = {};

        if (currentOccupancyRes.exists()) {
            currentOccupancy = currentOccupancyRes.data();
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

async function DeleteBooking(bookingId) {
    // delete booking from occupancy.
    const booking = await GetBooking(bookingId);
    for (var date = dayjs(booking.checkInDate); date.isBefore(booking.checkOutDate); date = date.add(1, 'day')) {
        var key = date.format('YYYYMMDD');
        var currentOccupancyRes = await getDoc(doc(db, "occupancy", key));
        var currentOccupancy = {};

        if (currentOccupancyRes.exists()) {
            currentOccupancy = currentOccupancyRes.data();
        }

        if (currentOccupancy[booking.roomNumber] === undefined || currentOccupancy[booking.roomNumber] === null) {
            currentOccupancy[booking.roomNumber] = [];
        }

        currentOccupancy[booking.roomNumber] = currentOccupancy[booking.roomNumber].filter(booking => booking.id !== bookingId);

        await setDoc(doc(db, "occupancy", key), currentOccupancy);
    }

    const bookingRef = doc(db, "booking", bookingId);
    await deleteDoc(bookingRef);
}

export { SaveBooking, GetBooking, DeleteBooking };