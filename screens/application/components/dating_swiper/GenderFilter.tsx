import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../utility/colors";
import { useState } from "react";

const GenderFilter: React.FC = function () {
  const [genderFilter, setGenderFilter] = useState<"male" | "female" | "both">(
    "male"
  );

  return (
    <View style={styles.filter_wrapper}>
      <Text style={styles.label}>Show me:</Text>
      <View style={styles.options_wrapper}>
        <View
          style={[
            styles.option_layout,
            { borderTopLeftRadius: 11.5, borderBottomLeftRadius: 11.5 },
            genderFilter === "male" && styles.active_layout,
            genderFilter === "female" && { borderRightWidth: 0 },
          ]}
        >
          <Pressable onPress={() => setGenderFilter("male")}>
            <Text
              style={[
                styles.option,
                genderFilter === "male" && styles.active_text,
              ]}
            >
              Male
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.option_layout,
            { borderLeftWidth: 0, borderRightWidth: 0 },
            genderFilter === "female" && styles.active_layout,
          ]}
        >
          <Pressable onPress={() => setGenderFilter("female")}>
            <Text
              style={[
                styles.option,
                genderFilter === "female" && styles.active_text,
              ]}
            >
              Female
            </Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.option_layout,
            { borderTopRightRadius: 11.5, borderBottomRightRadius: 11.5 },
            genderFilter === "both" && styles.active_layout,
            genderFilter === "female" && { borderLeftWidth: 0 },
          ]}
        >
          <Pressable onPress={() => setGenderFilter("both")}>
            <Text
              style={[
                styles.option,
                genderFilter === "both" && styles.active_text,
              ]}
            >
              Both
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filter_wrapper: {
    width: "100%",
    marginTop: "7.5%",
    marginBottom: "5%",
  },
  options_wrapper: {
    flexDirection: "row",
    width: "98%",
    height: 45,
    marginVertical: "1%",
    borderRadius: 15,
  },
  option_layout: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.textSecondary,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: colors.secondaryBackground,
  },
  option: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "hn_medium",
    color: colors.textPrimary,
  },
  active_layout: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  active_text: {
    color: colors.primaryBackground,
  },
  label: {
    fontSize: 15,
    color: colors.textSecondaryContrast,
    fontFamily: "hn_medium",
    marginBottom: "1.5%",
    marginLeft: "1.5%",
  },
});

export default GenderFilter;
