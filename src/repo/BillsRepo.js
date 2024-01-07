import { db } from "./FirebaseApp.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

async function GetBills(bookingId) {
    if (bookingId === null || bookingId === undefined || bookingId === '') {
        return [];
    }

    const billsRef = doc(db, "bills", bookingId);
    const billsDoc = await getDoc(billsRef);

    if (billsDoc.exists()) {
        const bills = billsDoc.data();
        return bills.bills;
    }

    return [];
}

async function SaveBills(bookingId, bills) {
    const billsRef = doc(db, "bills", bookingId);
    await setDoc(billsRef, { bills: bills });
}

export { GetBills, SaveBills };
