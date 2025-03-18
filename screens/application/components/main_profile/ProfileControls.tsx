import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../utility/colors";

const ProfileControls: React.FC = function () {
  return (
    <View style={styles.controls}>
      <Pressable style={styles.button_layout}>
        <Text style={styles.button}>Log out</Text>
      </Pressable>
      <Pressable style={styles.button_layout}>
        <Text style={styles.delete_button}>Delete Account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginTop: "7.5%",
    marginBottom: "40%",
    gap: "6%",
  },
  button_layout: {
    width: "91%",
    alignSelf: "center",
  },
  button: {
    borderRadius: 20,
    backgroundColor: colors.primary,
    fontSize: 19,
    textAlign: "center",
    paddingVertical: 12.5,
    color: colors.secondaryBackground,
    fontFamily: "hn_medium",
  },
  delete_button: {
    borderRadius: 20,
    fontSize: 19,
    textAlign: "center",
    paddingVertical: 12.5,
    borderColor: colors.error,
    borderWidth: 2.5,
    fontFamily: "hn_medium",
    color: colors.error,
  },
});

export default ProfileControls;
