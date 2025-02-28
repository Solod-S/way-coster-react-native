import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";

export function BackButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      className=" bg-white border border-gray-200 rounded-full flex items-center justify-center"
      style={{ width: hp(5), height: hp(5) }}
    >
      <Ionicons name="caret-back-outline" size={hp(4)} color="red" />
    </TouchableOpacity>
  );
}
