import { useEffect } from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useCharmrDispatch } from "../../utility/store/store";

import { tokenFromStorageLoader } from "../../utility/store/slices/authentication";

import DatingSwiper from "./DatingSwiper";
import Likes from "./Likes";
import Messages from "./Messages";
import Profile from "./Profile";

import { colors } from "../../utility/colors";

const AppTabsNavigation = createBottomTabNavigator();

const Application: React.FC = function () {
  const dispatch = useCharmrDispatch();

  useEffect(() => {
    dispatch(tokenFromStorageLoader());

    // TODO: validate the token before accessing the application. If it is experied show a modal and redirect the user.
  }, []);

  return (
    <AppTabsNavigation.Navigator
      initialRouteName="main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "main") {
            iconName = focused
              ? require("../../assets/icons/main_active.png")
              : require("../../assets/icons/main_inactive.png");
          } else if (route.name === "likes") {
            iconName = focused
              ? require("../../assets/icons/likes_active.png")
              : require("../../assets/icons/likes_inactive.png");
          } else if (route.name === "messages") {
            iconName = focused
              ? require("../../assets/icons/messages_active.png")
              : require("../../assets/icons/messages_inactive.png");
          } else if (route.name === "profile") {
            iconName = focused
              ? require("../../assets/icons/profile_active.png")
              : require("../../assets/icons/profile_inactive.png");
          }

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    height: "200%",
                    aspectRatio: "1/1",
                    borderRadius: 50,
                    backgroundColor: colors.primary,
                    zIndex: -1,
                    top: "50%",
                    transform: "translateY(-13.5%)",
                  }}
                />
              )}
              <Image
                source={iconName}
                style={{
                  aspectRatio: "1/1",
                  height: "95%",
                  resizeMode: "contain",
                  top: "55%",
                }}
              />
            </View>
          );
        },
        animation: "shift",
        headerShown: false,
        tabBarStyle: {
          height: "10%",
          borderTopWidth: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          elevation: 0,
          justifyContent: "center",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingLeft: "5%",
          paddingRight: "5%",
          paddingTop: "1%",
          paddingBottom: "2%",
        },
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            android_ripple={{ color: "transparent" }}
          />
        ),
      })}
    >
      <AppTabsNavigation.Screen name="main" component={DatingSwiper} />
      <AppTabsNavigation.Screen name="likes" component={Likes} />
      <AppTabsNavigation.Screen name="messages" component={Messages} />
      <AppTabsNavigation.Screen name="profile" component={Profile} />
    </AppTabsNavigation.Navigator>
  );
};

export default Application;
