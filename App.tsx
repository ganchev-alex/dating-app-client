import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Welcome from "./screens/welcome/Welcome";
import Authenticate from "./screens/authenticate/Authenticate";

import { colors } from "./utility/colors";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    hn_heavy: require("./assets/fonts/HelveticaNeueHeavy.otf"),
    hn_medium: require("./assets/fonts/HelveticaNeueMedium.otf"),
    hv_regular: require("./assets/fonts/HelveticaNeueLight.otf"),
  });

  if (!fontsLoaded) {
    return null; // Replace it later with loading screen
  }

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="welcome"
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
