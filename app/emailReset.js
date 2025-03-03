import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import LottieView from "lottie-react-native";

export default function EmailReset() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
        padding: 20,
        paddingTop: 30,
        gap: 30,
        alignItems: "center",
      }}
      edges={["top"]}
    >
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bolt",
            fontSize: hp(4),
            color: "red",
          }}
        >
          Check Your Email
        </Text>

        <View style={{ width: wp(80), marginTop: 20 }}>
          <View style={{ aspectRatio: 1 }}>
            <LottieView
              style={{ flex: 1 }}
              source={require("../assets/images/email.json")}
              autoPlay
              loop
              speed={0.7}
            />
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "outfit-bolt",
            fontSize: hp(2),
            textAlign: "center",
            color: "gray",
          }}
        >
          We have sent you an email with instructions on how to reset your
          password. Please check your inbox and follow the steps provided. If
          you don’t see the email, check your spam folder or request a new one
          from your account settings.
        </Text>
      </View>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          onPress={() => router.replace("welcome")}
          style={{ height: hp(7), width: wp(80) }}
          className="bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
        >
          <Text
            style={{ fontSize: hp(3) }}
            className="text-white font-bold tracking-widest"
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
