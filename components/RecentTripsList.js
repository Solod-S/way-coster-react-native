import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getRandomImage } from "../utils";
import { EmptyList } from "./EmptyList";
import { useRouter } from "expo-router";
import { RecentTripsItem } from "./RecentTripsItem";

const items = [
  {
    id: 1,
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: 2,
    place: "London Eye",
    country: "England",
  },
  {
    id: 3,
    place: "Washington dc",
    country: "America",
  },
  {
    id: 4,
    place: "New york",
    country: "America",
  },
  {
    id: 5,
    place: "New york",
    country: "America",
  },
  {
    id: 6,
    place: "New york",
    country: "America",
  },
];

export function RecentTripsList() {
  const router = useRouter();
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
        <FlatList
          data={items}
          numColumns={2}
          ListEmptyComponent={<EmptyList message={"No trips recorded yet."} />}
          keyExtractor={item => item.id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <RecentTripsItem item={item} router={router} />;
          }}
        />
      </View>
    </View>
  );
}
