import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { getRandomImage } from "../utils";

export function RecentTripsItem({ item, router }) {
  return (
    <TouchableOpacity onPress={() => router.push("/tripDetails")}>
      <View className="bg-white p-3 rounded-2xl mb-3 ">
        <Image
          style={{ width: wp(40), height: wp(40) }}
          className="mb-2"
          source={getRandomImage()}
        />
        <Text style={{ fontSize: hp(2) }} className="text-gray-600 font-bold">
          {item.place}
        </Text>
        <Text style={{ fontSize: hp(1.5) }} className="text-gray-600 ">
          {item.country}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
