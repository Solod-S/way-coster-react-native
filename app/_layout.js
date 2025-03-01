import { Stack } from "expo-router";
import "../global.css";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

import { View } from "react-native";
export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </View>
  );
}
