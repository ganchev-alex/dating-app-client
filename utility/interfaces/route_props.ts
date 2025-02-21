import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type WelcomeStackParamList = {
  greetings: {
    asset: string;
    titleIcon: string;
    title: string;
    message: string;
    buttonLabel: string;
    nextRoute: "profiles";
  };
  profiles: {
    asset: string;
    titleIcon: string;
    title: string;
    message: string;
    buttonLabel: string;
    nextRoute: "chat";
  };
  chat: {
    asset: string;
    titleIcon: string;
    title: string;
    message: string;
    buttonLabel: string;
    nextRoute: "parent";
  };
};

export interface IWelcomeProps {
  navigation: StackNavigationProp<
    WelcomeStackParamList,
    "greetings" | "profiles" | "chat"
  >;
  route: RouteProp<WelcomeStackParamList, "greetings" | "profiles" | "chat">;
}
