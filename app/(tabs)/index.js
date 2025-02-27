import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />
      <View>
        <Text
          className={`${Colors.heading} font-bold`}
          style={{ fontSize: hp(5) }}
        >
          Way{" "}
          <Text
            className="text-green-500 font-bold"
            style={{ fontSize: hp(5) }}
          >
            Coster
          </Text>
        </Text>
        <Animated.View entering={FadeIn.delay(200).springify()}>
          <TouchableOpacity
            onPress={() => router.push("home")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-green-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-white font-bold tracking-widest"
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(300).springify()}>
          <TouchableOpacity
            // onPress={() => router.push("home")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-white flex items-center justify-center mx-auto rounded-full border-[2px] border-green-500"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-green-500 font-bold tracking-widest"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
