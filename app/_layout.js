import { Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";

import { View } from "react-native";
import store from "../redux/store";
import { useEffect } from "react";
import { initAuthListener } from "@/redux/slices/authSlice";

const MainLayout = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener());
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof isAuthenticated == "undefined") return;

    const inApp = segments[0] == "(tabs)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (isAuthenticated == false) {
      router.replace("welcome");
    }
  }, [isAuthenticated]);

  return <View></View>;
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(notificationScreen)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="signIn" options={{ headerShown: false }} />
            <Stack.Screen name="signUp" options={{ headerShown: false }} />
            <Stack.Screen
              name="restorePassword"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tripsModal)"
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack>
          <Toast />
          <MainLayout />
        </View>
      </MenuProvider>
    </Provider>
  );
}
