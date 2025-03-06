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
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { registerUser, setIsStatus } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function SignUp() {
  const { status, isLoading } = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    if (!email || !password || !name || !confirmPassword) {
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

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        position: "top",
        text2: "Passwords do not match",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    dispatch(registerUser({ email, password, fullName: name }));
  };
  useEffect(() => {
    if (status === "succeeded") {
      router.replace("emailVerify");
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
                Sign Up
              </Text>
            </View>

            <Animated.View
              entering={FadeInDown.delay(100).springify()}
              className="flex-row justify-center my-3 mt-5"
            >
              <Image
                style={{ width: wp(55), height: wp(55) }}
                source={require("../assets/images/signup.svg")}
              />
            </Animated.View>
            <View className="mx-4 ">
              <Animated.View
                entering={FadeInDown.delay(200).springify()}
                className="gap-2"
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  className="bg-white rounded-full p-4 mb-3"
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(300).springify()}
                className="gap-2"
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
                entering={FadeInDown.delay(400).springify()}
                className="gap-2"
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Password
                </Text>
                <View className="flex-row items-center bg-white rounded-full p-4 mb-3">
                  <TextInput
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(500).springify()}
                className="gap-2"
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Confirm Password
                </Text>
                <View className="flex-row items-center bg-white rounded-full p-4 mb-3">
                  <TextInput
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
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
              <Animated.View
                entering={FadeInDown.delay(600).springify()}
                className="gap-2"
              >
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={{ height: hp(7), width: wp(80) }}
                  className="shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
                >
                  <Text
                    style={{ fontSize: hp(3) }}
                    className="text-white font-bold tracking-widest"
                  >
                    Sign Up
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
