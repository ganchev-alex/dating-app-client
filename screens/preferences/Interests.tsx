import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import PrefRootLayout from "./components/PrefRootLayout";
import { colors } from "../../utility/colors";

const interests = [
  // 🎨 Creative & Artistic
  "📸 Photography",
  "🎨 Art & Drawing",
  "✍️ Writing & Blogging",
  "🎵 Music",
  "🎻 Playing Instruments",
  "👗 Fashion & Styling",
  "🛠️ DIY & Crafting",

  // 🎮 Entertainment & Leisure
  "🎬 Movies & TV Shows",
  "🎮 Gaming",
  "💃 Dancing",
  "🍣 Culinary Experiences",

  // 🏋️ Fitness & Outdoor Activities
  "🏕️ Hiking & Outdoors",
  "💪 Fitness & Gym",
  "🧘 Meditation & Mindfulness",
  "⚾ Sports",

  // 🌎 Knowledge & Self-Improvement
  "📖 Reading & Books",
  "🌍 Language Learning",
  "🧠 Learning",
  "🔬 Science & Innovation",
  "💰 Investing",
  "🚀 Entrepreneurship",

  // 🌱 Lifestyle & Social Interests
  "✈️ Traveling",
  "🍳 Cooking & Baking",
  "🐶 Pets & Animal Care",
  "🖥️ Technology & Gadgets",
  "❤️ Volunteering & Charity Work",
  "🌌 Astronomy & Space",
  "✨ Astrology",
];

const Interests: React.FC = function () {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const onSelectHandler = function (interest: string) {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prevState) =>
        prevState.filter((intr) => intr !== interest)
      );
    } else {
      setSelectedInterests((prevState) => [...prevState, interest]);
    }
  };

  return (
    <PrefRootLayout
      nextRoute="about"
      progressStep={6}
      accessibilityCondition={selectedInterests.length >= 5}
    >
      <View style={styles.interests}>
        <ScrollView
          contentContainerStyle={styles.interestsContainerStyle}
          showsVerticalScrollIndicator={false}
        >
          {interests.map((intrest, index) => (
            <Pressable
              key={index}
              style={[
                styles.option,
                selectedInterests.includes(intrest) && {
                  backgroundColor: colors.secondaryBackground,
                  borderColor: colors.secondaryBackground,
                },
              ]}
              onPress={() => onSelectHandler(intrest)}
            >
              <Text style={styles.interest}>{intrest}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.heading}>Interests and Hobbies</Text>
      <Text style={styles.subheading}>
        In order to expose you to more profiles that match your vibes select at
        least 5 of your interests that describe you the best.
      </Text>
    </PrefRootLayout>
  );
};

const styles = StyleSheet.create({
  interests: { width: "90%", alignSelf: "center", height: "60%" },
  interestsContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "1.5%",
    paddingTop: "2.5%",
    paddingBottom: "45%",
  },
  heading: {
    fontSize: 20,
    fontFamily: "hn_medium",
    textAlign: "center",
    color: colors.textPrimary,
    marginTop: "10%",
  },
  subheading: {
    fontSize: 14,
    fontFamily: "hn_regular",
    color: colors.textSecondaryContrast,
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    marginBottom: "-12%",
  },
  option: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: colors.extraLightGrey,
    borderWidth: 2,
    borderRadius: 18,
  },
  interest: {
    fontSize: 15,
    fontFamily: "hn_regular",
  },
});

export default Interests;
