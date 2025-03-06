import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setItemsPerPage } from "../redux/slices/tripsSlice"; // Импортируем экшены

import { EmptyList } from "./EmptyList";
import { RecentTripsItem } from "./RecentTripsItem";
import { tripsFirebaseServices } from "../services";
import { Loading } from "./Loading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export function RecentTripsList() {
  const { page, itemsPerPage } = useSelector(state => state.trips);
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrips = async newPage => {
    if (!user?.uid || !isAuthenticated) return;

    try {
      setIsLoading(true);
      const {
        success,
        trips: newTrips,
        total,
      } = await tripsFirebaseServices.getUserTripsPagination(
        user.uid,
        newPage,
        itemsPerPage
      );

      if (success) {
        setTrips(newTrips);
        setTotalPages(Math.ceil(total / itemsPerPage));
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

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  return (
    <View className="mx-4 gap-4 ">
      <Animated.View
        entering={FadeIn.delay(300).springify()}
        className="flex-row justify-between items-center"
      >
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
      </Animated.View>

      <View>
        {isLoading ? (
          <View className="mt-12">
            <Loading color="red" size={hp(3)} />
          </View>
        ) : (
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"No trips recorded yet."} />
            }
            keyExtractor={item => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecentTripsItem
                item={item}
                index={index}
                router={router}
                deleteTrip={deleteTrip}
              />
            )}
            ListFooterComponent={
              totalPages === 0 ? null : (
                <View className="flex-row justify-between items-center mt-4">
                  <TouchableOpacity
                    onPress={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`p-2 px-4 border rounded-full ${
                      page === 1 ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <Text className="text-gray-600 font-bold">←</Text>
                  </TouchableOpacity>

                  <Text className="text-gray-600 font-bold">
                    Page {page} of {totalPages}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                    className={`p-2 px-4 border rounded-full ${
                      page === totalPages ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <Text className="text-gray-600 font-bold">→</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          />
        )}
      </View>
    </View>
  );
}
