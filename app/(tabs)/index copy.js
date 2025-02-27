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

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1  flex justify-end ">
      <StatusBar style="light" />
      <Image
        className="w-full h-full absolute"
        source={require("../../assets/images/welcome.jpg")}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{
          width: wp(100),
          height: hp(70),
          flex: 1,
          justifyContent: "flex-end",
          paddingBottom: hp(10),
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        // className="flex justify-end pb-12 space-y-8"
      >
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="flex items-center mb-3"
        >
          <Text
            style={{ fontSize: hp(5) }}
            className="text-white font-bold tracking-wide"
          >
            Way <Text className="text-green-500">Coster</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(200).springify()}>
          <TouchableOpacity
            // onPress={() => router.push("home")}
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
      </LinearGradient>
    </View>
  );
}
