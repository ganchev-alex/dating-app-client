import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import PrefRootLayout from "./PrefRootLayout";

import { colors } from "../../utility/colors";
import { useContext, useState } from "react";
import { VerificationContext } from "../../utility/context/verification";

const sexualities = [
  { label: "Straight (Heterosexual)", value: "heterosexual" },
  { label: "Gay (Homosexual)", value: "homosexual" },
  { label: "Bisexual", value: "bisexual" },
  { label: "Without Preference", value: "without_preference" },
];

const Sexuality: React.FC = function () {
  const verificationContext = useContext(VerificationContext);
  const [sexuality, setSexuality] = useState("");

  const appendSexuality = function () {
    verificationContext.manageDetailsProperties("sexuality", sexuality);
  };

  return (
    <PrefRootLayout
      progressStep={2}
      nextRoute="age"
      accessibilityCondition={sexuality !== ""}
      contextManager={appendSexuality}
    >
      <View style={styles.options}>
        {sexualities.map((s, i) => (
          <Pressable
            key={i}
            style={[
              styles.optionLayout,
              { borderBottomWidth: i === sexualities.length - 1 ? 0 : 2 },
            ]}
            onPress={() => setSexuality(s.value)}
          >
            <Text
              style={[
                styles.option,
                {
                  color:
                    sexuality === s.value ? colors.primary : colors.textPrimary,
                },
              ]}
            >
              {s.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.heading}>What is your sexual orientation?</Text>
      <Text style={styles.subheading}>
        Based on your sexaul preferences and gender we will decide what profiles
        to show you.
      </Text>
    </PrefRootLayout>
  );
};

const styles = StyleSheet.create({
  options: {
    padding: "8%",
    paddingTop: 0,
  },
  optionLayout: {
    paddingTop: "5.5%",
    paddingBottom: "5.5%",
    borderBottomColor: colors.extraLightGrey,
  },
  option: {
    fontSize: 18.5,
    fontFamily: "hn_medium",
  },
  heading: {
    fontSize: 20,
    fontFamily: "hn_medium",
    textAlign: "center",
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "hn_regular",
    color: colors.textSecondaryContrast,
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginBottom: "42.5%",
  },
});

export default Sexuality;
