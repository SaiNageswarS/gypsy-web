import { db } from "./FirebaseApp.js";
import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
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
            res.id = bookingDetail.id;
            return res;
        });

        occupancy[roomNum] = await Promise.all(bookingDetailPromises);
    };

    return occupancy;
}

async function DeleteOccupancy(booking) {
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

        currentOccupancy[booking.roomNumber] = currentOccupancy[booking.roomNumber]
            .filter(b => b.id !== booking.id);

        await setDoc(doc(db, "occupancy", key), currentOccupancy);
    }
}

async function SaveOccupancy(booking) {
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

        var bookingRef = doc(db, "booking", booking.id);
        currentOccupancy[booking.roomNumber].push(bookingRef);

        await setDoc(doc(db, "occupancy", key), currentOccupancy);
    }
}

async function RefreshOccupancy() {
    // delete all entries in occupancy.
    const startDate = dayjs().subtract(15, 'day');
    const endDate = dayjs().add(10, 'day');

    for (var date = dayjs(startDate); date.isBefore(endDate); date = date.add(1, 'day')) {
        var key = date.format('YYYYMMDD');
        await deleteDoc(doc(db, "occupancy", key));
    }

    // get all bookings.
    const bookingsPromise = await getDocs(collection(db, "booking"));
    const bookings = bookingsPromise.docs.map(doc => {
        const booking = doc.data();
        booking.id = doc.id;
        return booking;
    });

    for (var booking of bookings) {
        await SaveOccupancy(booking);
    }
}

function GetRoomList() {
    const result = [];

    for (var roomNum of Object.keys(RoomCapacity)) {
        const capacity = RoomCapacity[roomNum];
        result.push({ roomNumber: roomNum, idx: 0 });

        for (var i = 1; i < capacity; i++) {
            result.push({ roomNumber: roomNum, idx: i });
        }
    }

    return result;
}

const RoomCapacity = { "101": 1, "102": 1, "103": 1, "104": 8, "201": 6, "202": 6, "203": 6, "204": 8, "301": 1, "302": 1, "303": 1, "304": 1 };

export { GetOccupancy, DeleteOccupancy, SaveOccupancy, RefreshOccupancy, GetRoomList, RoomCapacity };