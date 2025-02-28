import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export function EmptyList({ message }) {
  return (
    <View className="my-5 flex justify-center items-center gap-3">
      <Image
        style={{
          width: wp(37),
          height: wp(37),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
        source={require("../assets/images/empty.png")}
      />
      <Text style={{ fontSize: hp(2) }} className="font-bold text-gray-400">
        {message || "Data not Found"}
      </Text>
    </View>
  );
}
