import { Dimensions, StyleSheet, Text, View } from "react-native";
import LocationFilter from "./LocationFilter";

import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../utility/colors";

const { width, height } = Dimensions.get("screen");

const SwipingFilter: React.FC = function () {
  return (
    <View style={styles.preventer}>
      <LinearGradient
        colors={["rgba(30,30,30,0)", `${colors.textPrimary}`]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.backdrop}
      >
        <View style={styles.modal}>
          <Text style={styles.heading}>Filters</Text>
          <LocationFilter />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  preventer: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 150,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "80%",
    zIndex: 150,
  },
  modal: {
    alignItems: "center",
    width: "92%",
    maxHeight: "50%",
    marginHorizontal: "4%",
    borderBottomLeftRadius: 17.5,
    borderBottomRightRadius: 17.5,
    backgroundColor: colors.secondaryBackground,
    paddingTop: "2.5%",
    paddingHorizontal: "7%",
  },
  heading: {
    fontFamily: "hn_medium",
    color: colors.textPrimary,
    fontSize: 16.5,
    marginBottom: "10%",
  },
});

export default SwipingFilter;
