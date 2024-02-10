import { db } from "./FirebaseApp.js";
import { addDoc, collection } from "firebase/firestore";

async function SaveExpense(expense) {
    const docRef = await addDoc(collection(db, "expenses"), expense);
    return docRef.id;
}

export { SaveExpense };
