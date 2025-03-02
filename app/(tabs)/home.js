import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";
import { Text, TouchableOpacity, View } from "react-native";
import { RecentTripsList } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView>
        <StatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <Text
            className={`${Colors.heading} font-bold`}
            style={{ fontSize: hp(4) }}
          >
            Way
            <Text
              className="text-red-500 font-bold"
              style={{ fontSize: hp(4) }}
            >
              Coster
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(logoutUser())}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text style={{ fontSize: hp(2) }} className="text-gray-600">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center p-4 ">
          <Image
            style={{ width: wp(60), height: wp(60) }}
            source={require("../../assets/images/banner.png")}
          />
        </View>
        <RecentTripsList />
      </ScrollView>
    </SafeAreaView>
  );
}
