import { useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import PrefRootLayout from "./PrefRootLayout";
import { colors } from "../../utility/colors";
import { API_ROOT } from "../../App";
import { VerificationContext } from "../../utility/context/verification";
import { useNavigation } from "@react-navigation/native";
import { INavigationPreferenceProps } from "../../utility/interfaces/route_props";
import { AuthenticationContext } from "../../utility/context/authentication";
import Loading from "../others/Loading";

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
  const navigation = useNavigation<INavigationPreferenceProps>();
  const verificationContext = useContext(VerificationContext);
  const authenticationContext = useContext(AuthenticationContext);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loadingState, setLoadingState] = useState(false);

  const onSelectHandler = function (interest: string) {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests((prevState) =>
        prevState.filter((intr) => intr !== interest)
      );
    } else {
      setSelectedInterests((prevState) => [...prevState, interest]);
    }
  };

  const submitVerificationPayload = async function () {
    try {
      setLoadingState(true);
      const formData = new FormData();

      formData.append(
        "birthYear",
        verificationContext.detailsPayload.birthYear.toString()
      );
      formData.append("gender", verificationContext.detailsPayload.gender);
      formData.append(
        "sexuality",
        verificationContext.detailsPayload.sexuality
      );
      formData.append(
        "latitude",
        verificationContext.detailsPayload.latitude.toString()
      );
      formData.append(
        "longitude",
        verificationContext.detailsPayload.longitude.toString()
      );
      formData.append(
        "locationNormalized",
        verificationContext.detailsPayload.locationNormalized
      );

      // Handle interests (send as separate fields, not JSON)
      selectedInterests.forEach((interest) => {
        formData.append("interests", interest);
      });

      // Handle the profilePic file upload
      if (verificationContext.detailsPayload.profilePic.uri) {
        const profilePic = {
          uri: verificationContext.detailsPayload.profilePic.uri,
          name: verificationContext.detailsPayload.profilePic.fileName,
          type: verificationContext.detailsPayload.profilePic.mimeType,
        };

        formData.append("profilePic", profilePic as any);
      }

      const response = await fetch(`${API_ROOT}/auth/register-details`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authenticationContext.getToken()}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      if (response.ok) {
        navigation.navigate("verified");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState(false);
    }
  };

  return loadingState ? (
    <Loading />
  ) : (
    <PrefRootLayout
      nextRoute="verified"
      progressStep={6}
      accessibilityCondition={selectedInterests.length >= 5}
      contextManager={submitVerificationPayload}
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
