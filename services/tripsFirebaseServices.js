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
} from "firebase/firestore";
import { db } from "../config/fireBaseConfig";
import { getRandomImageNumber } from "../utils";

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

    return { success: true, id: newTripRef.id };
  } catch (error) {
    console.error("Error adding trip: ", error);
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

    return { success: true };
  } catch (error) {
    console.error("Error deleting trip: ", error);
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

    return { success: true };
  } catch (error) {
    console.error("Error updating trip: ", error);
    return { success: false, error: error.message };
  }
};

// Get user trips
tripsFirebaseServices.getUserTrips = async uid => {
  if (!uid) {
    throw new Error("UID is required");
  }

  try {
    const tripsCollectionRef = collection(db, `users/${uid}/trips`);
    const q = query(tripsCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, trips };
  } catch (error) {
    console.error("Error fetching trips: ", error);
    return { success: false, error: error.message };
  }
};
