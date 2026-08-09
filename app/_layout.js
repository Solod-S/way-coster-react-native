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
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = dispatch(initAuthListener());
    // return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = dispatch(initAuthListener());

  //   return () => {
  //     if (typeof unsubscribe === "function") {
  //       unsubscribe();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    console.log(`isAuthenticated`, isAuthenticated);
    if (typeof isAuthenticated === "undefined") return;
    try {
      console.log("segments[0]", segments[0]);
      const inApp = segments[0] === "(tabs)";
      console.log("inApp", inApp);
      const inTripModal = segments[0] === "(tripsModal)";
      console.log("inApp", inTripModal);
      const inNotification = segments[0] === "(notificationScreen)";
      console.log("inNotification", inNotification);
      const inAuth = segments[0] === "(auth)";
      console.log("inAuth", inAuth);
      if (isAuthenticated && (!inApp || !inTripModal)) {
        console.log("go home");
        router.replace("home");
      } else if (isAuthenticated === false && (!inNotification || !inAuth)) {
        console.log("go welcome");
        router.replace("welcome");
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
