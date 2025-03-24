import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../utility/colors";

const dummyMatches = [
  require("../../../../assets/profiles/profile_1.jpg"),
  require("../../../../assets/profiles/profile_2.jpg"),
  require("../../../../assets/profiles/profile_3.jpg"),
  require("../../../../assets/profiles/profile_1.jpg"),
  require("../../../../assets/profiles/profile_2.jpg"),
  require("../../../../assets/profiles/profile_3.jpg"),
  require("../../../../assets/profiles/profile_1.jpg"),
  require("../../../../assets/profiles/profile_2.jpg"),
  require("../../../../assets/profiles/profile_3.jpg"),
];

const MessagesHeader: React.FC = function () {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>charmr. messages</Text>
      <Text style={styles.subtitle}>
        Chat with ease with all of your matches!
      </Text>
      <FlatList
        data={dummyMatches}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.match,
              index == 0 && { marginLeft: 12.5 },
              index == dummyMatches.length - 1 && { marginRight: 12.5 },
            ]}
          >
            <Image source={item} style={styles.match_image} />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingVertical: "2.5%",
    paddingBottom: "12.5%",
  },
  title: {
    fontFamily: "hn_heavy",
    fontSize: 20,
    textAlign: "center",
    color: colors.secondaryBackground,
  },
  subtitle: {
    fontFamily: "hn_medium",
    fontSize: 14,
    marginBottom: "2%",
    textAlign: "center",
    color: colors.extraLightPink,
  },
  match: {
    borderWidth: 1.7,
    borderRadius: 100,
    margin: 5,
    borderStyle: "dashed",
    borderColor: colors.extraLightPink,
  },
  match_image: {
    width: 65,
    height: 65,
    borderWidth: 1.7,
    borderStyle: "dashed",
    borderColor: colors.secondaryBackground,
    borderRadius: 50,
    margin: 3,
  },
});

export default MessagesHeader;
