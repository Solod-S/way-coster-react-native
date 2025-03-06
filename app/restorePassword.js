import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, CustomKeyboardView, Loading } from "../components";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, setIsStatus } from "../redux/slices/authSlice";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function RestorePassword() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, isLoading } = useSelector(state => state.auth);
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      if (!email) {
        Toast.show({
          type: "info",
          position: "top",
          text2: "Please fill all the fields",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        return;
      }
      dispatch(resetPassword({ email }));
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: "Error in password restore.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      router.replace("emailReset");
      // dispatch(setIsStatus("idle"));
    }
    return () => dispatch(setIsStatus("idle"));
  }, [status]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View className="mx-4 pb-6 flex-1">
          <View>
            <View className="relative">
              <View className="absolute top-0 left-0 z-10">
                <BackButton />
              </View>
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold text-center text-gray-600"
              >
                Restore Password
              </Text>
            </View>
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="flex-row justify-center my-3 mt-5"
            >
              <Image
                style={{ width: wp(72), height: wp(72) }}
                source={require("../assets/images/restorePassword.svg")}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              className="mx-4 gap-2"
            >
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-gray-600"
              >
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className="bg-white rounded-full p-4 mb-3"
              />
            </Animated.View>
          </View>

          <View className="mt-4">
            {isLoading ? (
              <View
                style={{ height: hp(7), width: wp(80) }}
                className="w-full shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
              >
                <Loading color="white" size={hp(3)} />
              </View>
            ) : (
              <Animated.View entering={FadeInDown.delay(300).springify()}>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(7), width: wp(80) }}
                  className="shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
                >
                  <Text
                    style={{ fontSize: hp(3) }}
                    className="text-white font-bold tracking-widest"
                  >
                    Restore
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
}
