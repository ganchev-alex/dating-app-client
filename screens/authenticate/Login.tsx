import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import AuthHeader from "./components/AuthHeader";
import CredentialInput from "./components/CredentialInput";
import { useState } from "react";
import { colors } from "../../utility/colors";

const Login: React.FC = function () {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const manageCredential = function (
    credentialKey:
      | "name"
      | "email"
      | "password"
      | "confirm_password"
      | "terms_agreement",
    value: string | boolean
  ) {
    setUserCredentials((prevState) => {
      return {
        ...prevState,
        [credentialKey]: value,
      };
    });
  };

  return (
    <ScrollView style={styles.screen}>
      <AuthHeader authMode="register" />
      <View style={styles.form}>
        <Image
          source={require("../../assets/icons/main.png")}
          style={styles.icon}
        />
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.subheading}>
          Log in to reconnect with your matches and continue the conversation.
        </Text>
        <CredentialInput
          type="email"
          label="E-mail"
          inputValue={userCredentials.email}
          inputHandler={manageCredential}
        />
        <CredentialInput
          type="password"
          label="Password"
          inputValue={userCredentials.password}
          inputHandler={manageCredential}
        />
        <View style={styles.button_layout}>
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: colors.secondary } : {},
              styles.button,
            ]}
          >
            <Text style={styles.button_label}>Login</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primaryBackground,
    minHeight: "100%",
    flex: 1,
  },
  form: {
    width: "97.5%",
    minHeight: "100%",
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    margin: "auto",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 15,
    alignItems: "center",
  },
  icon: {
    width: 67.5,
    height: 67.5,
  },
  heading: {
    fontSize: 26,
    color: colors.textPrimary,
    fontFamily: "hn_medium",
    marginTop: 7.5,
    marginBottom: 2.5,
  },
  subheading: {
    fontSize: 15.5,
    color: colors.textSecondary,
    fontFamily: "hn_regular",
    textAlign: "center",
    width: "90%",
    marginBottom: 25,
  },
  button_layout: {
    width: "100%",
    height: 45,
    marginTop: 35,
    borderRadius: 15,
    backgroundColor: colors.primary,
    overflow: "hidden",
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button_label: {
    fontSize: 18,
    color: colors.secondaryBackground,
    fontFamily: "hn_medium",
    marginTop: -2,
  },
});

export default Login;
