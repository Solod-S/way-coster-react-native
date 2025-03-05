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
import { getRandomImageNumber } from "../utils";
import Toast from "react-native-toast-message";

export const tripsFirebaseServices = {};

// Adding a trip
tripsFirebaseServices.addTrip = async (uid, tripData) => {
  if (!uid || !tripData) {
    throw new Error("UID and travel details are required");
  }

  try {
    const tripsCollectionRef = collection(db, `users/${uid}/trips`);
    const newTripRef = doc(tripsCollectionRef);
    await setDoc(newTripRef, {
      ...tripData,
      imgNumber: getRandomImageNumber(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setTimeout(() => {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "The trip has been created",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }, 300);

    return { success: true, id: newTripRef.id };
  } catch (error) {
    console.error("Error adding trip: ", error);
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

// Delete trip
tripsFirebaseServices.deleteTrip = async (uid, tripId) => {
  if (!uid || !tripId) {
    throw new Error("UID and trip ID are required");
  }

  try {
    const tripRef = doc(db, `users/${uid}/trips/${tripId}`);
    await deleteDoc(tripRef);

    Toast.show({
      type: "success",
      position: "top",
      text1: "Success",
      text2: "The trip has been deleted",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 50,
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting trip: ", error);
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

// Trip update
tripsFirebaseServices.updateTrip = async (uid, tripId, updatedData) => {
  if (!uid || !tripId || !updatedData) {
    throw new Error("UID, Trip ID and Updated Data are required");
  }

  try {
    const tripRef = doc(db, `users/${uid}/trips/${tripId}`);
    await updateDoc(tripRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });

    setTimeout(() => {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "The trip has been updated",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }, 300);

    return { success: true };
  } catch (error) {
    console.error("Error updating trip: ", error);
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

// Get user trips
tripsFirebaseServices.getUserTrips = async (uid, lastDoc = null) => {
  if (!uid) {
    throw new Error("UID is required");
  }

  try {
    const tripsCollectionRef = collection(db, `users/${uid}/trips`);
    let q = query(tripsCollectionRef, orderBy("createdAt", "desc"), limit(4));

    if (lastDoc) {
      q = query(
        tripsCollectionRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(4)
      );
    }

    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Получаем последний документ для следующей загрузки
    const lastVisible =
      querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { success: true, trips, lastDoc: lastVisible };
  } catch (error) {
    console.error("Error fetching trips: ", error);
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

tripsFirebaseServices.getUserTripsPagination = async (
  uid,
  page = 1,
  limit = 4
) => {
  if (!uid) {
    throw new Error("UID is required");
  }

  try {
    const tripsCollectionRef = collection(db, `users/${uid}/trips`);
    const q = query(tripsCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Получаем все документы (опционально можно использовать limit/offset Firestore)
    const allTrips = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Пагинация вручную
    const startIndex = (page - 1) * limit;
    const trips = allTrips.slice(startIndex, startIndex + limit);
    const total = allTrips.length;

    return { success: true, trips, total };
  } catch (error) {
    console.error("Error fetching trips: ", error);
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
