import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, CustomKeyboardView } from "../components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
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
      router.push("home");
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
            <View className="flex-row justify-center my-3 mt-5">
              <Image
                style={{ width: wp(72), height: wp(72) }}
                source={require("../assets/images/login.svg")}
              />
            </View>
            <View className="mx-4 gap-2">
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
              <View className="flex-row justify-end">
                <Text style={{ fontSize: hp(1.5) }} className=" text-gray-600">
                  Forget Password?
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-4">
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
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
}
