import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../config/fireBaseConfig";
import Toast from "react-native-toast-message";

export const expensesFirebaseServices = {};

// Adding an expense
expensesFirebaseServices.addExpense = async (uid, tripId, expenseData) => {
  if (!uid || !tripId || !expenseData) {
    throw new Error("UID, Trip ID and expense details are required");
  }

  try {
    const expensesCollectionRef = collection(
      db,
      `users/${uid}/trips/${tripId}/expenses`
    );
    const newExpenseRef = doc(expensesCollectionRef);
    await setDoc(newExpenseRef, {
      ...expenseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setTimeout(() => {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "The expense has been added",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }, 300);

    return { success: true, id: newExpenseRef.id };
  } catch (error) {
    console.error("Error adding expense: ", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: `${error.message}`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
    return { success: false, error: error.message };
  }
};

// Delete expense
expensesFirebaseServices.deleteExpense = async (uid, tripId, expenseId) => {
  if (!uid || !tripId || !expenseId) {
    throw new Error("UID, Trip ID and expense ID are required");
  }

  try {
    const expenseRef = doc(
      db,
      `users/${uid}/trips/${tripId}/expenses/${expenseId}`
    );
    await deleteDoc(expenseRef);

    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: "The expense has been deleted",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting expense: ", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: `${error.message}`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
    return { success: false, error: error.message };
  }
};

// Update expense
expensesFirebaseServices.updateExpense = async (
  uid,
  tripId,
  expenseId,
  updatedData
) => {
  if (!uid || !tripId || !expenseId || !updatedData) {
    throw new Error("UID, Trip ID, Expense ID and Updated Data are required");
  }

  try {
    const expenseRef = doc(
      db,
      `users/${uid}/trips/${tripId}/expenses/${expenseId}`
    );
    await updateDoc(expenseRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });

    setTimeout(() => {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "The expense has been updated",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }, 300);

    return { success: true };
  } catch (error) {
    console.error("Error updating expense: ", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: `${error.message}`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
    return { success: false, error: error.message };
  }
};

// Get expenses for a trip
expensesFirebaseServices.getExpenses = async (uid, tripId, lastDoc = null) => {
  if (!uid || !tripId) {
    throw new Error("UID and Trip ID are required");
  }

  try {
    const expensesCollectionRef = collection(
      db,
      `users/${uid}/trips/${tripId}/expenses`
    );
    let q = query(
      expensesCollectionRef,
      orderBy("createdAt", "desc"),
      limit(4)
    );

    if (lastDoc) {
      q = query(
        expensesCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(4)
      );
    }

    const querySnapshot = await getDocs(q);
    const expenses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { success: true, expenses, lastDoc: lastVisible };
  } catch (error) {
    console.error("Error fetching expenses: ", error);
    Toast.show({
      type: "error",
      position: "top",
      text1: "Error",
      text2: `${error.message}`,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });
    return { success: false, error: error.message };
  }
};
