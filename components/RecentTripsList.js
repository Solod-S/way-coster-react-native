import React, { useCallback, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EmptyList } from "./EmptyList";
import { useFocusEffect, useRouter } from "expo-router";
import { RecentTripsItem } from "./RecentTripsItem";
import { tripsFirebaseServices } from "../services";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";

export function RecentTripsList() {
  const [trips, seTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector(state => state.auth);
  const router = useRouter();

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      if (user.uid) {
        const { success, trips } = await tripsFirebaseServices.getUserTrips(
          user.uid
        );

        if (success) seTrips(trips);
      }
    } catch (error) {
      console.log(`Error in fetchTrips: `, error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
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
          <Loading color="red" size={hp(33)} />
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
            renderItem={({ item }) => {
              return <RecentTripsItem item={item} router={router} />;
            }}
          />
        )}
      </View>
    </View>
  );
}
