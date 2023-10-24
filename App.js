import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useFonts } from "expo-font";
import Home from "./pages/home";
import Statistics from "./pages/statistics";
import Admin from "./pages/admin";
import AdminCreateUser from "./pages/admin/admin-create-user";
import AdminCreateOwner from "./pages/admin/admin-create-owner";
import AdminUpdateUser from "./pages/admin/admin-update-user";
import AdminUpdateOwner from "./pages/admin/admin-update-owner";
import StatusAparat from "./pages/status-aparat";
import StatusAparatCurrent from "./pages/status-aparat/status-aparat-current";
import Group from "./pages/group";
import AboutAparat from "./pages/about-aparat";
import en from "./translate/en.json";
import ua from "./translate/ua.json";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import NotificationService from "./utils/notification-services";
import InternetStatus from "./utils/InternetStatus";
import { AppState } from "react-native";

AsyncStorage.getItem("lang").then((res) => {
  if (!res) {
    i18next.use(initReactI18next).init({
      compatibilityJSON: "v3",
      lng: "ua",
      resources: {
        en: en,
        ua: ua,
      },
      react: {
        useSuspense: false,
      },
    });
  } else {
    i18next.use(initReactI18next).init({
      compatibilityJSON: "v3",
      lng: res,
      resources: {
        en: en,
        ua: ua,
      },
      react: {
        useSuspense: false,
      },
    });
  }
});

const Stack = createStackNavigator();

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [fontsLoaded] = useFonts({
    "FiraSans-Bold": require("./assets/fonts/FiraSans-Bold.otf"),
    "FiraSans-Medium": require("./assets/fonts/FiraSans-Medium.otf"),
    "FiraSans-Regular": require("./assets/fonts/FiraSans-Regular.otf"),
    "Evolventa-Bold": require("./assets/fonts/Evolventa-Bold.ttf"),
    "Evolventa-Regular": require("./assets/fonts/Evolventa-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAppStateChange = async (nextAppState) => {
    if (appState === "active" && nextAppState === "inactive") {
    } else if (appState === "inactive" && nextAppState === "active") {
    } else if (appState === "background" && nextAppState === "inactive") {
      const saveMe = await AsyncStorage.getItem("saveMe");
      if (saveMe) {
      } else {
        await AsyncStorage.setItem("saveMe", JSON.stringify(false));
        await AsyncStorage.removeItem("token");
      }
    }

    setAppState(nextAppState);
  };

  return (
    <>
      <NavigationContainer
        onReady={() => {
          AppState.addEventListener("change", handleAppStateChange);

          return () => {
            AppState.removeEventListener("change", handleAppStateChange);
          };
        }}
      >
        <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: "#202124",
            },
          }}
          initialRouteName="home"
        >
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="statistics"
            component={Statistics}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="admin"
            component={Admin}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="admin/createUser"
            component={AdminCreateUser}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="admin/createOwner"
            component={AdminCreateOwner}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="admin/updateUser"
            component={AdminUpdateUser}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="admin/updateOwner"
            component={AdminUpdateOwner}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />

          <Stack.Screen
            name="status-aparat"
            component={StatusAparat}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="status-aparat-current"
            component={StatusAparatCurrent}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="group"
            component={Group}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
          <Stack.Screen
            name="about-aparat"
            component={AboutAparat}
            options={{
              animationEnabled: false,
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202124",
    alignItems: "center",
    justifyContent: "center",
  },
});
