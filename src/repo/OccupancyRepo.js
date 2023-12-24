import { db } from "./FirebaseApp.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dayjs from 'dayjs';

async function GetOccupancy(inputDate) {
    var key = dayjs(inputDate).format('YYYYMMDD');
    const result = await getDoc(doc(db, "occupancy", key));

    if (!result.exists()) {
        return {};
    }

    console.log("result", result.data());
    const occupancy = result.data();

    for (var roomNum of Object.keys(occupancy)) {
        const bookingDetailPromises = occupancy[roomNum].map(async booking => {
            var bookingDetail = await getDoc(booking);
            var res = bookingDetail.data();
            res.id = booking.id;
            return res;
        });

        occupancy[roomNum] = await Promise.all(bookingDetailPromises);
    };

    return occupancy;
}

const RoomList = ["101", "102", "103", "104", "201", "202", "203", "204", "301", "302", "303", "304"];

export { GetOccupancy, RoomList };