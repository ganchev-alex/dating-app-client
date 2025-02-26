import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

import AuthHeader from "./components/AuthHeader";
import CredentialInput from "./components/CredentialInput";

import { IRootNavigation } from "../../utility/interfaces/route_props";

import { colors } from "../../utility/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Authenticate: React.FC<IRootNavigation> = function ({ navigation }) {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    terms_agreement: false,
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

  const onSubmitHandler = function () {
    navigation.navigate("preferences");
  };

  return (
    <ScrollView style={styles.screen}>
      <AuthHeader />
      <View style={styles.form}>
        <CredentialInput
          type="name"
          label="Full Name"
          inputValue={userCredentials.name}
          inputHandler={manageCredential}
        />
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
        <CredentialInput
          type="confirm_password"
          label="Confirm Password"
          inputValue={userCredentials.confirm_password}
          inputHandler={manageCredential}
        />
        <View style={styles.container}>
          <Pressable>
            <Icon
              name={
                userCredentials.terms_agreement
                  ? "checkbox-multiple-marked"
                  : "checkbox-multiple-blank-outline"
              }
              size={26}
              onPress={() =>
                manageCredential(
                  "terms_agreement",
                  !userCredentials.terms_agreement
                )
              }
            />
          </Pressable>
          <View style={styles.message_wrapper}>
            <Text style={styles.message}>
              I agree with the
              <Pressable style={styles.pressable}>
                <Text style={styles.link}> terms and conditions </Text>
              </Pressable>
              of Ganchev dating app by signing up for an account.
            </Text>
          </View>
        </View>
        <View style={styles.button_layout}>
          <Pressable
            style={({ pressed }) => [
              pressed ? { backgroundColor: colors.secondary } : {},
              styles.button,
            ]}
            onPress={onSubmitHandler}
          >
            <Text style={styles.button_label}>Sign In</Text>
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
    paddingTop: 37.5,
    paddingBottom: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    width: "85%",
  },
  message: {
    fontFamily: "hn_regular",
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: colors.primary,
    marginBottom: -4.5,
    fontFamily: "hn_medium",
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

export default Authenticate;
