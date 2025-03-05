import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getRandomImage } from "../utils";
import { EmptyList } from "./EmptyList";
import { useFocusEffect, useRouter } from "expo-router";
import { RecentExpenseItem } from "./RecentExpenseItem";
import { useDispatch, useSelector } from "react-redux";
import { expensesFirebaseServices } from "../services";
import { Loading } from "./Loading";

export function RecentExpensesList({ item }) {
  const router = useRouter();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { user } = useSelector(state => state.auth);

  const fetchExpenses = async (reset = false) => {
    if (!user?.uid) return;

    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }

      const {
        success,
        expenses: newExpenses,
        lastDoc: newLastDoc,
      } = await expensesFirebaseServices.getExpenses(
        user.uid,
        item.id,
        reset ? null : lastDoc
      );

      if (success) {
        setExpenses(prevExpenses =>
          reset ? newExpenses : [...prevExpenses, ...newExpenses]
        );
        setLastDoc(newLastDoc);
      }
    } catch (error) {
      console.log(`Error in fetchExpenses: `, error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleDelete = expenseId => {
    Vibration.vibrate(200);
    Alert.alert(
      "Delete expense?",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deleteExpense(expenseId),
        },
      ]
    );
  };

  const deleteExpense = async expenseId => {
    try {
      const { success } = await expensesFirebaseServices.deleteExpense(
        user.uid,
        item.id,
        expenseId
      );
      if (success) fetchExpenses(true);
    } catch (error) {
      console.log(`Error in deleteExpense: `, error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchExpenses(true);
      return () => {};
    }, [])
  );

  return (
    <View className="mx-4 gap-4">
      <View className=" flex-row justify-between items-center">
        <Text style={{ fontSize: hp(3) }} className="text-gray-600 font-bold">
          Expenses
        </Text>
        <TouchableOpacity
          onPress={() => router.push({ pathname: "addExpense", params: item })}
          className="p-2 px-3 bg-white border border-gray-200 rounded-full"
        >
          <Text style={{ fontSize: hp(2) }} className="text-gray-600 ">
            Add Expense
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <View className="mt-12">
            <Loading color="red" size={hp(3)} />
          </View>
        ) : (
          <FlatList
            data={expenses}
            numColumns={1}
            ListEmptyComponent={
              <EmptyList message={"No expenses recorded yet."} />
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (!isFetchingMore && lastDoc) {
                fetchExpenses(false);
              }
            }}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              isFetchingMore ? <Loading size={hp(2.5)} /> : null
            }
            renderItem={({ item }) => {
              return (
                <RecentExpenseItem item={item} handleDelete={handleDelete} />
              );
            }}
          />
        )}
      </View>
    </View>
  );
}
