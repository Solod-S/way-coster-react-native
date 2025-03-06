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
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { tripsFirebaseServices } from "../../services";
import { useSelector } from "react-redux";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export default function EditTrip() {
  const item = useLocalSearchParams();

  const { user } = useSelector(state => state.auth);
  const router = useRouter();
  const [place, setPlace] = useState(item.place);
  const [country, setCountry] = useState(item.country);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddTrip = async () => {
    try {
      if (!place || !country) {
        Toast.show({
          type: "info",
          position: "top",
          // text1: "Failed",
          text2: "Please fill all the fields",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50,
        });
        return;
      }
      setIsLoading(true);
      const { success } = await tripsFirebaseServices.updateTrip(
        user.uid,
        item.id,
        {
          place,
          country,
        }
      );

      if (success) {
        router.back();
      }
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 mt-2">
      <View style={{ zIndex: 9999 }}>
        <Toast />
      </View>
      <CustomKeyboardView>
        <StatusBar style="dark" />
        <View className="mx-4 pb-6 flex-1">
          <View>
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
                Edit Trip
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeIn.delay(400).springify()}
              className="flex-row justify-center my-3 mt-5"
            >
              <Image
                style={{ width: wp(72), height: wp(72) }}
                source={require("../../assets/images/addTrip.png")}
              />
            </Animated.View>
            <View className="mx-4 gap-2">
              <Animated.View
                entering={FadeIn.delay(500).springify()}
                className=" gap-2"
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Where On Earth?
                </Text>
                <TextInput
                  value={place}
                  onChangeText={setPlace}
                  className="bg-white rounded-full p-4 mb-3"
                />
              </Animated.View>
              <Animated.View
                entering={FadeIn.delay(600).springify()}
                className=" gap-2"
              >
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-gray-600"
                >
                  Which Country
                </Text>
                <TextInput
                  value={country}
                  onChangeText={setCountry}
                  className="bg-white rounded-full p-4 mb-3"
                />
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
              <Animated.View entering={FadeIn.delay(700).springify()}>
                <TouchableOpacity
                  onPress={handleAddTrip}
                  style={{ height: hp(7), width: wp(80) }}
                  className="shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
                >
                  <Text
                    style={{ fontSize: hp(3) }}
                    className="text-white font-bold tracking-widest"
                  >
                    Save Trip
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
