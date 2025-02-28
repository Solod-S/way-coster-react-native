import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";
import { Text, TouchableOpacity, View } from "react-native";
import { BackButton, RecentExpensesList } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function TripDetails() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView>
        <StatusBar style="dark" />
        <View className="px-4">
          <View className="relative">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text
              style={{ fontSize: hp(4) }}
              className="font-bold text-center text-gray-600"
            >
              Add Trip
            </Text>
          </View>
          <View className="flex-row justify-center items-center p-4 ">
            <Image
              style={{ width: wp(90), height: wp(50) }}
              source={require("../../assets/images/addTrip.png")}
            />
          </View>
        </View>
        <RecentExpensesList />
      </ScrollView>
    </SafeAreaView>
  );
}
