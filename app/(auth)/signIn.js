import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, CustomKeyboardView, Loading } from "../../components";
import { Image } from "expo-image";

import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function SignIn() {
  const router = useRouter();
  const { isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
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
      dispatch(loginUser({ email, password }));
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: "Error in saving trip.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }
  };

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
                Login
              </Text>
            </View>
            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="flex-row justify-center my-3 mt-5"
            >
              <Image
                style={{ width: wp(72), height: wp(72) }}
                source={require("../../assets/images/login.svg")}
              />
            </Animated.View>
            <View className="mx-4">
              <Animated.View
                className="gap-2"
                entering={FadeInDown.delay(200).springify()}
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
              <Animated.View
                className="gap-2"
                entering={FadeInDown.delay(300).springify()}
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Password
                </Text>
                <View className="flex-row items-center bg-white rounded-full px-2 py-1 mb-3">
                  <TextInput
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  onPress={() => router.push("restorePassword")}
                >
                  <Animated.Text
                    entering={FadeInDown.delay(400).springify()}
                    style={{ fontSize: hp(1.5) }}
                    className=" text-gray-600"
                  >
                    Forget Password?
                  </Animated.Text>
                </TouchableOpacity>
              </View>
            </View>
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
              <Animated.View entering={FadeInDown.delay(500).springify()}>
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(7), width: wp(80) }}
                  className="shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
                >
                  <Text
                    style={{ fontSize: hp(3) }}
                    className="text-white font-bold tracking-widest"
                  >
                    Login
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
