import React, { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { EmptyList } from "./EmptyList";
import { RecentTripsItem } from "./RecentTripsItem";
import { tripsFirebaseServices } from "../services";
import { Loading } from "./Loading";

export function RecentTripsList() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null); // Храним последний документ
  const [isFetchingMore, setIsFetchingMore] = useState(false); // Блокируем повторные запросы
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  const fetchTrips = async (reset = false) => {
    if (!user?.uid) return;

    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const {
        success,
        trips: newTrips,
        lastDoc: newLastDoc,
      } = await tripsFirebaseServices.getUserTrips(
        user.uid,
        reset ? null : lastDoc
      );

      if (success) {
        setTrips(prevTrips => (reset ? newTrips : [...prevTrips, ...newTrips]));
        setLastDoc(newLastDoc);
      }
    } catch (error) {
      console.log(`Error in fetchTrips: `, error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const deleteTrip = async tripId => {
    try {
      const { success } = await tripsFirebaseServices.deleteTrip(
        user.uid,
        tripId
      );
      if (success) fetchTrips(true); // Перезагружаем список после удаления
    } catch (error) {
      console.log(`Error in deleteTrip: `, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTrips(true);
      return () => {};
    }, [])
  );

  return (
    <View className="mx-4 gap-4">
      <View className=" flex-row justify-between items-center">
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
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"No trips recorded yet."} />
            }
            keyExtractor={item => item.id}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!isFetchingMore && lastDoc) {
                fetchTrips(false);
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              isFetchingMore ? <Loading size={hp(2.5)} /> : null
            }
            renderItem={({ item }) => (
              <RecentTripsItem
                item={item}
                router={router}
                deleteTrip={deleteTrip}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}
