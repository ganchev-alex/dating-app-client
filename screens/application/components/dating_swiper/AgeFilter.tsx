import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { colors } from "../../../../utility/colors";

const { width } = Dimensions.get("window");

const AgeFilter: React.FC = function () {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Age Gap</Text>
      <Text style={styles.values}>
        min: <Text style={styles.inner_value}>{minAge}</Text>
      </Text>
      <MultiSlider
        values={[minAge, maxAge]}
        min={18}
        max={50}
        step={1}
        markerStyle={styles.thumb}
        selectedStyle={{ backgroundColor: colors.primary }}
        sliderLength={width * 0.42}
        containerStyle={{ marginTop: 2.5 }}
        trackStyle={{ height: 2.2 }}
        onValuesChangeFinish={(ageRange) => {
          setMinAge(ageRange[0]);
          setMaxAge(ageRange[1]);
        }}
      />
      <Text style={[styles.values, { textAlign: "right" }]}>
        max: <Text style={styles.inner_value}>{maxAge}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    width: "100%",
    fontFamily: "hn_medium",
    fontSize: 15,
    color: colors.textSecondaryContrast,
    textAlign: "center",
  },
  thumb: {
    height: 13,
    width: 13,
    borderRadius: 15,
    backgroundColor: colors.textPrimary,
    marginTop: 2,
  },
  values: {
    color: colors.textSecondaryContrast,
    fontFamily: "hn_medium",
    fontSize: 15,
    width: "20%",
  },
  inner_value: {
    color: colors.primary,
  },
});

export default AgeFilter;
