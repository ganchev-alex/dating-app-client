import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors } from "../../../../utility/colors";

const dummyData = [
  require("../../../../assets/profiles/profile_1.jpg"),
  require("../../../../assets/profiles/profile_2.jpg"),
  require("../../../../assets/profiles/profile_3.jpg"),
  require("../../../../assets/profiles/profile_1.jpg"),
];

const Gallery: React.FC = function () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gallery</Text>
      <Text style={styles.help}>
        Hold on the photo that you want to act upon. You can have up to 6 photos
        on your profile.
      </Text>
      {dummyData.map((src, key) => (
        <View style={styles.image_slot} key={key}>
          {key === 1 && (
            <View style={styles.pin}>
              <Icon name="pin" size={16.5} color={colors.secondaryBackground} />
            </View>
          )}
          <Image source={src} key={key} style={styles.image} />
        </View>
      ))}
      {dummyData.length < 6 && (
        <Pressable style={styles.add_button_layout}>
          <View style={styles.add_button}>
            <Icon name="plus" size={35} color={colors.primary} />
            <Text style={styles.add_button_label}>Add a photo</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackground,
    width: "91%",
    borderRadius: 45,
    marginHorizontal: "4.5%",
    padding: "8%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "1.25%",
    marginTop: "5%",
  },
  title: {
    fontFamily: "hn_medium",
    fontSize: 19,
    textAlign: "center",
    width: "100%",
  },
  help: {
    fontFamily: "hn_regular",
    fontSize: 15.5,
    textAlign: "center",
    width: "100%",
    color: colors.textSecondary,
    marginTop: "-3%",
    marginBottom: "3%",
  },
  image_slot: {
    width: "48.5%",
    aspectRatio: "9/16",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  pin: {
    position: "absolute",
    zIndex: 10,
    backgroundColor: colors.primary,
    padding: 4.5,
    paddingLeft: 6,
    borderRadius: 40,
    right: -2.5,
    top: -2.5,
  },
  add_button_layout: {
    width: "48.5%",
    borderWidth: 3,
    borderColor: colors.primary,
    borderStyle: "dashed",
    borderRadius: 30,
  },
  add_button: {
    width: "100%",
    aspectRatio: "9/16",
    justifyContent: "center",
    alignItems: "center",
  },
  add_button_label: {
    fontFamily: "hn_regular",
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default Gallery;
