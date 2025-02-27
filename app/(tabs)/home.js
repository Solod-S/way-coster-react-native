import React from "react";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-virtualized-view";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { getRandomImage } from "../../utils";
var items = [
  {
    id: 1,
    place: "Gujrat",
    country: "Pakistan",
  },
  {
    id: 2,
    place: "London Eye",
    country: "England",
  },
  {
    id: 3,
    place: "Washington dc",
    country: "America",
  },
  {
    id: 4,
    place: "New york",
    country: "America",
  },
  {
    id: 5,
    place: "New york",
    country: "America",
  },
  {
    id: 6,
    place: "New york",
    country: "America",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <ScrollView>
        <StatusBar style="dark" />
        <View className="flex-row justify-between items-center mx-4">
          <Text
            className={`${Colors.heading} font-bold`}
            style={{ fontSize: hp(4) }}
          >
            Way
            <Text
              className="text-red-500 font-bold"
              style={{ fontSize: hp(4) }}
            >
              Coster
            </Text>
          </Text>
          <TouchableOpacity
            // onPress={() => router.push("home")}
            className="p-2 px-3 bg-white border border-gray-200 rounded-full"
          >
            <Text style={{ fontSize: hp(2) }} className="text-gray-600 ">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center p-4 ">
          <Image
            style={{ width: wp(60), height: wp(60) }}
            source={require("../../assets/images/banner.png")}
          />
        </View>
        <View className="mx-4 gap-4">
          <View className=" flex-row justify-between items-center">
            <Text
              style={{ fontSize: hp(3) }}
              className="text-gray-600 font-bold"
            >
              Recent Trips
            </Text>
            <TouchableOpacity
              // onPress={() => router.push("home")}
              className="p-2 px-3 bg-white border border-gray-200 rounded-full"
            >
              <Text style={{ fontSize: hp(2) }} className="text-gray-600 ">
                Add Trip
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={items}
              numColumns={2}
              keyExtractor={item => item.id}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <View className="bg-white p-3 rounded-2xl mb-3 shadow-sm">
                      <Image
                        style={{ width: wp(40), height: wp(40) }}
                        className="mb-2"
                        source={getRandomImage()}
                      />
                      <Text
                        style={{ fontSize: hp(2) }}
                        className="text-gray-600 font-bold"
                      >
                        {item.place}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.5) }}
                        className="text-gray-600 "
                      >
                        {item.country}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
