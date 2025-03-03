import React from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { UsePreventBack } from "../hooks/usePreventBack";

export default function HomeScreen() {
  UsePreventBack();
  const router = useRouter();
  const user = useSelector(state => state.user);

  return (
    <SafeAreaView className="flex-1 justify-between pb-2 items-center">
      <StatusBar style="dark" />
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        style={{
          height: wp(100),
          aspectRatio: 1,
        }}
      >
        <LottieView
          style={{ flex: 1 }}
          source={require("../assets/images/welcome2.json")}
          autoPlay
          loop
          speed={0.6}
        />
      </Animated.View>

      <View>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="flex items-center mb-3"
        >
          <Text
            style={{ fontSize: hp(5) }}
            className="text-gray-600 font-bold tracking-wide"
          >
            Way <Text className="text-red-500">Coster</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300).springify()}>
          <TouchableOpacity
            onPress={() => router.push("signIn")}
            // onPress={() => router.push("emailVerify")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-white font-bold tracking-widest"
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeIn.delay(400).springify()}>
          <TouchableOpacity
            onPress={() => router.push("signUp")}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-white flex items-center justify-center mx-auto rounded-full border-[2px] border-red-500"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="text-red-500 font-bold tracking-widest"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
