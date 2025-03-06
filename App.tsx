import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SecureStore from "expo-secure-store";

import Welcome from "./screens/welcome/Welcome";
import Authenticate from "./screens/authenticate/Authenticate";
import Preferences from "./screens/preferences/Preferences";
import Application from "./screens/application/Application";

import { colors } from "./utility/colors";
import AuthenticationContextProvider from "./utility/context/authentication";
import Loading from "./screens/others/Loading";

const Stack = createStackNavigator();

export default function App() {
  const [initialToken, setInitialToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkForExistingToken = async function () {
      setLoading(true);
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        if (storedToken) {
          setInitialToken(storedToken);
        }
      } catch (error) {
        setInitialToken("");
      } finally {
        setLoading(false);
      }
    };

    checkForExistingToken();
  }, [initialToken]);

  const [fontsLoaded] = useFonts({
    hn_heavy: require("./assets/fonts/HelveticaNeueHeavy.otf"),
    hn_medium: require("./assets/fonts/HelveticaNeueMedium.otf"),
    hn_regular: require("./assets/fonts/HelveticaNeueRoman.otf"),
  });

  if (!fontsLoaded) {
    return null; // Replace it later with loading screen
  }

  return (
    <>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <AuthenticationContextProvider>
          {loading ? (
            <Loading />
          ) : (
            <Stack.Navigator
              // initialRouteName={initialToken ? "app" : "welcome"}
              initialRouteName="app"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="welcome" component={Welcome} />
              <Stack.Screen
                name="authenticate"
                component={Authenticate}
                options={{ animation: "reveal_from_bottom" }}
              />
              <Stack.Screen
                name="preferences"
                component={Preferences}
                options={{ animation: "slide_from_right" }}
              />
              <Stack.Screen
                name="app"
                component={Application}
                options={{ animation: "fade" }}
              />
            </Stack.Navigator>
          )}
        </AuthenticationContextProvider>
      </NavigationContainer>
    </>
  );
}

export const API_ROOT = "https://7fb5-77-70-24-90.ngrok-free.app/api";
