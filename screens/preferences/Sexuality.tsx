import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import PrefRootLayout from "./components/PrefRootLayout";

import { colors } from "../../utility/colors";
import { useState } from "react";

const sexualities = [
  "Straight (Heterosexual)",
  "Gay (Homosexual)",
  "Bisexual",
  "Asexual",
  "Pansexual",
  "Show me all",
];

const Sexuality: React.FC = function () {
  const [sexuality, setSexuality] = useState("");

  return (
    <PrefRootLayout
      progressStep={2}
      nextRoute="age"
      accessibilityCondition={sexuality !== ""}
    >
      <View style={styles.options}>
        {sexualities.map((s, i) => (
          <Pressable
            key={i}
            style={[
              styles.optionLayout,
              { borderBottomWidth: i === sexualities.length - 1 ? 0 : 2 },
            ]}
            onPress={() => setSexuality(s)}
          >
            <Text
              style={[
                styles.option,
                {
                  color: sexuality === s ? colors.primary : colors.textPrimary,
                },
              ]}
            >
              {s}
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
    marginBottom: "8.5%",
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
});

export default Sexuality;
