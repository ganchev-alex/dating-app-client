import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  welcome: undefined;
  authenticate: undefined;
  preferences: undefined;
};

export interface IRootNavigation {
  navigation: StackNavigationProp<
    RootStackParamList,
    "welcome" | "authenticate" | "preferences"
  >;
}

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

export type AuthenticationParamsList = {
  register: undefined;
  login: undefined;
};

export type INavigationAuthenticationProps = StackNavigationProp<
  AuthenticationParamsList,
  "login" | "register"
>;

export interface IAuthenticationProps {
  navigation: INavigationAuthenticationProps;
  route: RouteProp<AuthenticationParamsList, "login" | "register">;
}

export type PreferencesParamsList = {
  greeting: undefined;
  gender: undefined;
  sexuality: undefined;
  age: undefined;
  location: undefined;
  picture: undefined;
  interests: undefined;
  about: undefined;
};

export type INavigationPreferenceProps = StackNavigationProp<
  PreferencesParamsList,
  | "greeting"
  | "gender"
  | "sexuality"
  | "age"
  | "location"
  | "picture"
  | "interests"
  | "about"
>;

export interface IPreferencesProps {
  navigation: INavigationPreferenceProps;
}
