import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { EmptyList } from "./EmptyList";
import { RecentTripsItem } from "./RecentTripsItem";
import { tripsFirebaseServices } from "../services";
import { Loading } from "./Loading";
import { SafeAreaView } from "react-native-safe-area-context";

const ITEMS_PER_PAGE = 4;

export function RecentTripsList() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  const fetchTrips = async newPage => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      const {
        success,
        trips: newTrips,
        total,
      } = await tripsFirebaseServices.getUserTripsPagination(
        user.uid,
        newPage,
        ITEMS_PER_PAGE
      );

      if (success) {
        setTrips(newTrips);
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.log(`Error in fetchTrips: `, error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTrip = async tripId => {
    try {
      const { success } = await tripsFirebaseServices.deleteTrip(
        user.uid,
        tripId
      );
      if (success) fetchTrips(page);
    } catch (error) {
      console.log(`Error in deleteTrip: `, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTrips(page);
    }, [page])
  );

  return (
    <View className="mx-4 gap-4">
      <View className="flex-row justify-between items-center">
        <Text style={{ fontSize: hp(3) }} className="text-gray-600 font-bold">
          Recent Trips
        </Text>
        <TouchableOpacity
          onPress={() => router.push("addTrip")}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full"
        >
          <Text style={{ fontSize: hp(2) }} className="text-gray-600 ">
            Add Trip
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {isLoading ? (
          <View className="mt-12">
            <Loading color="red" size={hp(3)} />
          </View>
        ) : (
          <>
            <FlatList
              data={trips}
              numColumns={2}
              ListEmptyComponent={
                <EmptyList message={"No trips recorded yet."} />
              }
              keyExtractor={item => item.id}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <RecentTripsItem
                  item={item}
                  router={router}
                  deleteTrip={deleteTrip}
                />
              )}
            />

            {/* Pagination */}
            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() => setPage(prev => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`p-2 px-4 border rounded-full ${
                  page === 1 ? "bg-gray-200" : "bg-white"
                }`}
              >
                <Text className="text-gray-600 font-bold">← </Text>
              </TouchableOpacity>

              <Text className="text-gray-600 font-bold">
                Page {page} of {totalPages}
              </Text>

              <TouchableOpacity
                onPress={() => setPage(prev => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className={`p-2 px-4 border rounded-full ${
                  page === totalPages ? "bg-gray-200" : "bg-white"
                }`}
              >
                <Text className="text-gray-600 font-bold">→</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
