import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { categoryBG } from "../constants/Colors";

export function RecentExpenseItem({ item }) {
  return (
    <View
      style={{ backgroundColor: categoryBG[item.category] }}
      className=" flex-row justify-between items-center p-3 mb-3 px-5 rounded-2xl"
    >
      <View>
        <Text style={{ fontSize: hp(2) }} className="text-gray-600 font-bold">
          {item.title}
        </Text>
        <Text style={{ fontSize: hp(1.6) }} className="text-gray-600 ">
          {item.category}
        </Text>
      </View>
      <View>
        <Text>${item.amount}</Text>
      </View>
    </View>
  );
}
