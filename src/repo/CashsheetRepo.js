import { GetBills } from "./BillsRepo.js";
import { db } from "./FirebaseApp.js";
import { getDocs, collection, query, where } from "firebase/firestore";

async function GetCashSheet(month, year) {
    const bookingsPromise = GetBookings(month, year);
    const expensesPromise = GetExpenses(month, year);

    const [bookings, expenses] = await Promise.all([bookingsPromise, expensesPromise]);

    const result = [];

    for (var booking of bookings) {
        const bills = await GetBills(booking.id);

        for (var bill of bills) {
            if (bill.description === "Credit") {
                continue;
            }

            result.push({
                detail: booking.name,
                source: booking.src,
                type: bill.description,
                amount: parseFloat(bill.amount)
            });
        }
    }

    for (var expense of expenses) {
        result.push({
            detail: "Expense",
            type: expense.description,
            amount: 0 - parseFloat(expense.amount),
            source: ""
        });
    }

    return result;
}

async function GetBookings(month, year) {
    const startDateString = `${year}-${monthsMap[month]}`;

    if (month === "Dec") year = (parseInt(year) + 1).toString();

    const endDateString = `${year}-${nextMonthMap[month]}`;

    const collectionRef = collection(db, 'booking');
    const q = query(collectionRef,
        where('checkInDate', '>=', startDateString),
        where('checkInDate', '<', endDateString),
        where('checkedOut', '==', true));

    const snapshot = await getDocs(q);
    const result = snapshot.docs.map(doc => doc.data());
    // console.log("cashSheet result", result);

    return result;
}

async function GetExpenses(month, year) {
    const startDateString = `${year}-${monthsMap[month]}`;

    if (month === "Dec") year = (parseInt(year) + 1).toString();

    const endDateString = `${year}-${nextMonthMap[month]}`;

    const collectionRef = collection(db, 'expenses');
    const q = query(collectionRef,
        where('date', '>=', startDateString),
        where('date', '<', endDateString));

    const snapshot = await getDocs(q);
    const result = snapshot.docs.map(doc => { return { id: doc.id, ...doc.data() } });
    return result;
}

const monthsMap = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
};

const nextMonthMap = {
    "Jan": "02",
    "Feb": "03",
    "Mar": "04",
    "Apr": "05",
    "May": "06",
    "Jun": "07",
    "Jul": "08",
    "Aug": "09",
    "Sep": "10",
    "Oct": "11",
    "Nov": "12",
    "Dec": "01"
};

export { GetCashSheet };
