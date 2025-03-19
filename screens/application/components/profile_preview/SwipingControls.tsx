import { Pressable, StyleSheet, View } from "react-native";
import IconFA6 from "react-native-vector-icons/FontAwesome6";
import IconO from "react-native-vector-icons/Octicons";

import { colors } from "../../../../utility/colors";

const SwipingControls: React.FC = function () {
  return (
    <View style={styles.controls}>
      <Pressable style={styles.side_button}>
        <IconFA6 name="xmark" size={35} color={colors.rewindButton} />
      </Pressable>
      <Pressable style={styles.prime_button}>
        <IconFA6
          name="heart-circle-plus"
          size={45}
          color={colors.secondaryBackground}
        />
      </Pressable>
      <Pressable style={styles.side_button}>
        <IconO name="star-fill" size={35} color={colors.superlikeButton} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-15%",
    gap: "4%",
  },
  side_button: {
    borderRadius: 50,
    height: 70,
    width: 70,
    backgroundColor: colors.secondaryBackground,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  prime_button: {
    borderRadius: 50,
    backgroundColor: colors.primary,
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default SwipingControls;
