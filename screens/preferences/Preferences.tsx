import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Sex from "./Sex";

const PreferenceStack = createStackNavigator();

const Preferences: React.FC = function () {
  return (
    <PreferenceStack.Navigator
      initialRouteName="sex"
      screenOptions={{ headerShown: false }}
    >
      <PreferenceStack.Screen name="sex" component={Sex} />
    </PreferenceStack.Navigator>
  );
};

export default Preferences;
