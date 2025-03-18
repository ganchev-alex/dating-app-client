import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Entypo";

import { colors } from "../../../../utility/colors";

const MatchPreview = function () {
  return (
    <View style={styles.screen}>
      <View style={styles.heading}>
        <Icon name="new" size={20} color={colors.primary} />
        <Text style={styles.notification}>You have 4 new matches</Text>
      </View>
      <View style={styles.profiles}>
        <Image
          source={require("../../../../assets/profiles/profile_1.jpg")}
          style={[styles.profile_pic, styles.pic_left]}
          resizeMode="cover"
        />
        <Image
          source={require("../../../../assets/profiles/profile_2.jpg")}
          style={[styles.profile_pic, styles.pic_right]}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.title}>Match!</Text>
      <Text style={styles.message}>
        {
          "You have got a new match with {Username}! Act now on them and get to know each other. "
        }
      </Text>
      <Pressable style={styles.button_layout}>
        <Text style={styles.chat_button}>Chat Now</Text>
      </Pressable>
      <Pressable style={styles.button_layout}>
        <Text style={styles.continue_button}>
          Continue Swiping / Preview next match
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    gap: "2.5%",
  },
  heading: {
    alignSelf: "center",
    marginBottom: "15%",
    flexDirection: "row",
    gap: "1.5%",
  },
  notification: {
    fontSize: 15,
    fontFamily: "hn_regular",
    color: colors.textSecondaryContrast,
  },
  profiles: {
    width: "75%",
    height: "40%",
    alignSelf: "center",
  },
  profile_pic: {
    width: "62.5%",
    height: "100%",
    borderRadius: 15,
    position: "absolute",
  },
  pic_left: {
    transform: [{ rotate: "-10deg" }],
  },
  pic_right: {
    transform: [{ rotate: "10deg" }],
    position: "absolute",
    right: -10,
    top: -25,
  },
  title: {
    fontSize: 46,
    fontFamily: "hn_heavy",
    textAlign: "center",
    color: colors.primary,
  },
  message: {
    fontSize: 17.5,
    fontFamily: "hn_regular",
    textAlign: "center",
    width: "85%",
    alignSelf: "center",
    color: colors.textSecondaryContrast,
    marginTop: "-7.5%",
    marginBottom: "5%",
  },
  button_layout: {
    width: "85%",
    alignSelf: "center",
  },
  chat_button: {
    textAlign: "center",
    fontFamily: "hn_medium",
    fontSize: 19,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 20,
    color: colors.secondaryBackground,
  },
  continue_button: {
    textAlign: "center",
    fontFamily: "hn_medium",
    fontSize: 17,
    padding: 10,
    color: colors.textSecondary,
    textDecorationLine: "underline",
    marginTop: "-2.5%",
  },
});

export default MatchPreview;
