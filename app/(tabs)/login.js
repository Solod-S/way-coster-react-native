import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
export default function Login() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />
      <Text>Login</Text>
    </SafeAreaView>
  );
}
