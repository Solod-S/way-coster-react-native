import React from "react";
import { StatusBar } from "expo-status-bar";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import { Text, TouchableOpacity, View } from "react-native";
import { BackButton, RecentExpensesList } from "../../components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function TripDetails() {
  const item = useLocalSearchParams();
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <ScrollView className="mt-2">
        <StatusBar style="dark" />
        <View className="px-4">
          <Animated.View
            entering={FadeIn.delay(300).springify()}
            className="relative"
          >
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-center text-gray-600"
            >
              {item?.place}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-center text-gray-600"
            >
              {item?.country}
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeIn.delay(400).springify()}
            className="flex-row justify-center items-center p-4 "
          >
            <Image
              style={{ width: wp(90), height: wp(50) }}
              source={require("../../assets/images/tripDetails.png")}
            />
          </Animated.View>
        </View>
        <RecentExpensesList item={item} />
      </ScrollView>
    </SafeAreaView>
  );
}
