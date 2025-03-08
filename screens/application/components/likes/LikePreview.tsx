import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../utility/colors";

const LikesPreview: React.FC = function () {
  return (
    <View style={styles.slot_container}>
      <LinearGradient
        colors={["#1E1E1E", "rgba(30,30,30,0)"]}
        start={[0, 1]}
        end={[0, 0]}
        style={styles.gradient}
      />
      <Image
        src="https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={styles.picture}
        resizeMode="cover"
      />
      <View style={styles.details}>
        <Text style={styles.name}>Stewird, 32</Text>
        <Text style={styles.distance}>17 km.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slot_container: {
    width: "50%",
    paddingHorizontal: 5,
    paddingVertical: 6.5,
  },
  picture: {
    width: "100%",
    aspectRatio: "9/11",
    borderRadius: 12.5,
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    left: 0,
    marginHorizontal: 5,
    marginVertical: 6.5,
    borderRadius: 12.5,
    opacity: 0.65,
  },
  details: {
    position: "absolute",
    width: "100%",
    marginHorizontal: 5,
    marginVertical: 6.5,
    bottom: "5%",
    left: "5%",
    zIndex: 2,
  },
  name: {
    fontFamily: "hn_medium",
    color: colors.secondaryBackground,
    fontSize: 18,
  },
  distance: {
    fontFamily: "hn_regular",
    color: colors.primaryBackground,
    fontSize: 16,
  },
});

export default LikesPreview;
