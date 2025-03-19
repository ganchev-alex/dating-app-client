import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { colors } from "../../utility/colors";

import SwipingControls from "./components/profile_preview/SwipingControls";

const { height } = Dimensions.get("window");

const ProfilePreview: React.FC = function () {
  return (
    <View style={style.screen}>
      <ScrollView>
        <Image
          source={require("../../assets/profiles/profile_1.jpg")}
          style={style.profile_pic}
          resizeMode="cover"
        />
        <SwipingControls />
        <View style={style.main}></View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.secondaryBackground,
  },
  profile_pic: {
    width: "100%",
    height: 0.675 * height,
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
  },
  main: {
    width: "100%",
    minHeight: height * 0.3,
  },
});

export default ProfilePreview;
