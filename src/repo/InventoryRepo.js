import { db } from "./FirebaseApp.js";
import { collection, getDocs, query } from "firebase/firestore";

async function GetBeds(startDate, endDate) {
    console.log("Getting beds from", startDate, "to", endDate);
    const q = query(collection(db, "DefaultInventory"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => doc.data());
}

export { GetBeds };