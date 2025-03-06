import { Pressable, StyleSheet, Text, View, Image } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";
import IconF from "react-native-vector-icons/Feather";
import { colors } from "../../../../utility/colors";
import SwipingFilter from "./SwipingFilter";

const SwipingHeader: React.FC = function () {
  return (
    <View style={styles.heading_menu}>
      <Text style={styles.heading}>charmr.</Text>
      <View style={styles.button_layout}>
        <Pressable style={styles.icon}>
          <IconF
            name="sliders"
            size={21.5}
            color={colors.textSecondaryContrast}
          />
        </Pressable>
      </View>
      <SwipingFilter />
    </View>
  );
};

const styles = StyleSheet.create({
  heading_menu: {
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "-3.5%",
    width: "98%",
    position: "relative",
  },
  heading: {
    fontFamily: "hn_heavy",
    color: colors.textPrimary,
    fontSize: 20,
  },
  button_layout: {
    position: "absolute",
    right: "1.5%",
    top: 0,
  },
  icon: {
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    borderRadius: 9.5,
    paddingVertical: 5,
    paddingHorizontal: 5.7,
  },
});

export default SwipingHeader;
