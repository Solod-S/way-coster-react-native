import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { images } from "../utils";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Foundation } from "@expo/vector-icons";
import { CustomMenuItems } from "./CustomMenuItems";
import { Divider } from "./Divider";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export function RecentTripsItem({ item, router, deleteTrip, index }) {
  return (
    <Animated.View entering={FadeIn.delay(index * 100).springify()}>
      <TouchableOpacity
        onPress={() => router.push({ pathname: "tripDetails", params: item })}
      >
        <View className="bg-white p-3 rounded-2xl mb-3 ">
          <View className="absolute z-10 right-2 top-2">
            <Menu>
              <MenuTrigger style={{ zIndex: 51 }}>
                <Foundation name="indent-more" size={34} color="tomato" />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                  borderWidth: 0.1,
                  borderRadius: 10,
                  width: 120,
                  marginTop: 35,
                  marginLeft: -20,
                }}
              >
                <CustomMenuItems
                  text="Edit"
                  action={() =>
                    router.push({ pathname: "editTrip", params: item })
                  }
                  value={null}
                  icon={
                    <AntDesign name="edit" size={hp(2.5)} color="#737373" />
                  }
                />

                <Divider />
                <CustomMenuItems
                  text="Delete"
                  action={() =>
                    Alert.alert(
                      "Confirm Deletion",
                      "Are you sure you want to delete this trip? Data recovery will not be possible.",
                      [
                        { text: "No", style: "cancel" },
                        { text: "Yes", onPress: () => deleteTrip(item.id) },
                      ]
                    )
                  }
                  value={null}
                  icon={
                    <AntDesign name="delete" size={hp(2.5)} color="#737373" />
                  }
                />
              </MenuOptions>
            </Menu>
          </View>
          <Image
            style={{ width: wp(40), height: wp(40) }}
            className="mb-2"
            // source={getRandomImage()}
            source={images[item.imgNumber] || images[1]}
          />
          <Text style={{ fontSize: hp(2) }} className="text-gray-600 font-bold">
            {item.place}
          </Text>
          <Text style={{ fontSize: hp(1.5) }} className="text-gray-600 ">
            {item.country}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
