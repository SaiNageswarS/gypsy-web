import { db } from "./FirebaseApp.js";
import { doc, getDoc, collection } from "firebase/firestore";
import dayjs from 'dayjs';

async function GetBookings(bookingDate) {
    console.log("Getting bookings for", bookingDate);

    var key = dayjs(bookingDate).format('YYYYMMDD');
    const result = await getDoc(doc(db, "booking", key));

    console.log("result", result.data());
    return result.data();
}

export { GetBookings };