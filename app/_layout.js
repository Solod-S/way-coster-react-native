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

const MainLayout = ({ children }) => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener());
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    try {
      const inApp = segments[0] === "(tabs)";
      const inTripModal = segments[0] === "(tripsModal)";
      const inNotification = segments[0] === "(notificationScreen)";
      const inAuth = segments[0] === "(auth)";
      // const inNotificationScreen = segments[0] === "(notificationScreen)";
      if (isAuthenticated && (!inApp || !inTripModal)) {
        setTimeout(() => {
          router.replace("home");
        }, 300);
      } else if (isAuthenticated === false && (!inNotification || !inAuth)) {
        setTimeout(() => {
          router.replace("welcome");
        }, 300);
      }
    } catch (error) {
      console.log(`Error in isAuthenticated check: `, error);
    }
  }, [isAuthenticated]);

  return <View style={{ flex: 1 }}>{children}</View>;
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <MainLayout>
        <MenuProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="(notificationScreen)"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(tripsModal)"
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack>
          <Toast />
          {/* <MainLayout /> */}
        </MenuProvider>
      </MainLayout>
    </Provider>
  );
}
