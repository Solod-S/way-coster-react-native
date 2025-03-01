import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getRandomImage } from "../utils";
import { EmptyList } from "./EmptyList";
import { useRouter } from "expo-router";
import { RecentExpenseItem } from "./RecentExpenseItem";

const items = [
  {
    id: 1,
    title: "ate burger",
    amount: 4,
    category: "food",
  },
  {
    id: 2,
    title: "bought a knife",
    amount: 12,
    category: "shopping",
  },
  {
    id: 3,
    title: "watched a movie",
    amount: 20,
    category: "entertainment",
  },
];

export function RecentExpensesList({ item }) {
  const router = useRouter();
  return (
    <View className="mx-4 gap-4">
      <View className=" flex-row justify-between items-center">
        <Text style={{ fontSize: hp(3) }} className="text-gray-600 font-bold">
          Expenses
        </Text>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/addExpense", params: item })}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full"
        >
          <Text style={{ fontSize: hp(2) }} className="text-gray-600 ">
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={items}
          ListEmptyComponent={
            <EmptyList message={"No expenses recorded yet."} />
          }
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <RecentExpenseItem item={item} />;
          }}
        />
      </View>
    </View>
  );
}
