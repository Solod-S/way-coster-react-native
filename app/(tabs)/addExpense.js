import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BackButton, CustomKeyboardView } from "../../components";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { categories } from "../../constants/Categories";

export default function AddExpense() {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();

  const handleAddExpense = () => {
    try {
      if (!title || !amount || !category) {
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

      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: "Error in saving expense.",
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
                Add Expense
              </Text>
            </View>
            <View className="flex-row justify-center my-3 ">
              <Image
                style={{ width: wp(65), height: wp(65) }}
                source={require("../../assets/images/expenseBanner.png")}
              />
            </View>
            <View className="mx-4 gap-2">
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-gray-600"
              >
                For What?
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                className="bg-white rounded-full p-4 mb-3"
              />
              <Text
                style={{ fontSize: hp(2) }}
                className="font-bold text-gray-600"
              >
                How mush?
              </Text>
              <TextInput
                value={amount}
                //  onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))} // Оставляет только цифры
                keyboardType="numeric"
                onChangeText={setAmount}
                className="bg-white rounded-full p-4 mb-3"
              />
            </View>
          </View>
          <View className="mx-4 gap-2">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold text-gray-600"
            >
              Category
            </Text>
            <View className="flex-row flex-wrap items-center gap-3">
              {categories.map(cat => {
                let bgColor = "bg-white";
                if (cat.value === category) {
                  bgColor = "bg-red-300";
                }
                return (
                  <TouchableOpacity
                    onPress={() => setCategory(cat.value)}
                    className={`rounded-full ${bgColor} px-4 p-3`}
                    key={cat.value}
                  >
                    <Text>{cat.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View className="mt-4">
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{ height: hp(7), width: wp(80) }}
              className="shadow-sm bg-red-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200 mb-4"
            >
              <Text
                style={{ fontSize: hp(3) }}
                className="text-white font-bold tracking-widest"
              >
                Add Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  );
}
