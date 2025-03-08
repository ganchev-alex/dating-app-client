import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../utility/colors";
import LikesPreview from "./components/likes/LikePreview";
import Heading from "./components/likes/Heading";
import { useState } from "react";
import Preview from "./components/likes/Preview";

const dummyData = Array(7)
  .fill(null)
  .map((_, index) => ({ id: index.toString() }));

const SectionTitle: React.FC<{ title: string }> = function ({ title }) {
  return (
    <View style={styles.title_wrapper}>
      <View style={styles.line} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line} />
    </View>
  );
};

const Likes: React.FC = function () {
  const [selectedView, setSelectedView] = useState<"likes" | "pending">(
    "likes"
  );

  return (
    <View>
      <FlatList
        data={dummyData}
        numColumns={2}
        contentContainerStyle={styles.grid}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={
          <>
            <Heading
              selectedView={selectedView}
              onSelectView={setSelectedView}
            />
            <Preview selectedView={selectedView} />
            <SectionTitle title="Today" />
          </>
        }
        renderItem={(_) => <LikesPreview />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title_wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "92%",
    marginHorizontal: "4%",
    marginTop: "2.5%",
  },
  line: {
    height: 1,
    backgroundColor: colors.textSecondary,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "hn_regular",
    color: colors.textSecondary,
    marginHorizontal: 6,
  },
  grid: {
    padding: "3%",
  },
});

export default Likes;
