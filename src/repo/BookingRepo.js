import { db } from "./FirebaseApp.js";
import { doc, collection, setDoc, addDoc, getDoc, deleteDoc } from "firebase/firestore";
import dayjs from 'dayjs';
import { DeleteOccupancy, SaveOccupancy } from "./OccupancyRepo.js";
import { SaveBills } from "./BillsRepo.js";

async function SaveBooking(bookingId, bookingData, bills) {
    if (bookingId !== null) {
        // if existing booking, delete old occupancy.
        const existingBooking = await GetBooking(bookingId);
        await DeleteOccupancy(existingBooking);

        const bookingRef = doc(db, "booking", bookingId);
        await setDoc(bookingRef, bookingData);
        bookingData.id = bookingRef.id;
    } else {
        // else create new booking.
        const bookingRef = await addDoc(collection(db, "booking"), bookingData);
        bookingData.id = bookingRef.id;
    }

    await SaveBills(bookingData.id, bills);
    await SaveOccupancy(bookingData);
}

async function GetBooking(bookingId) {
    const bookingRef = doc(db, "booking", bookingId);
    const bookingDoc = await getDoc(bookingRef);
    if (bookingDoc.exists()) {
        const booking = bookingDoc.data();
        booking.id = bookingId;
        return booking;
    }

    return null;
}

async function DeleteBooking(bookingId) {
    // delete booking from occupancy.
    const booking = await GetBooking(bookingId);
    await DeleteOccupancy(booking);

    const bookingRef = doc(db, "booking", bookingId);
    await deleteDoc(bookingRef);
}

export { SaveBooking, GetBooking, DeleteBooking };