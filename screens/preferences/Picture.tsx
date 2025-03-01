import { Alert, Pressable, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import * as ImagePickerTools from "expo-image-picker";

import PrefRootLayout from "./components/PrefRootLayout";

import { colors } from "../../utility/colors";

const Picture: React.FC = function () {
  const [imageUri, setImageUri] = useState("");

  const uploadImage = async function () {
    try {
      const { status } = await ImagePickerTools.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permision denied", "Grant access to your photos.");
      }

      const result = await ImagePickerTools.launchImageLibraryAsync({
        mediaTypes: ImagePickerTools.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [10, 16],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {}
  };

  return (
    <PrefRootLayout
      nextRoute="interests"
      progressStep={5}
      accessibilityCondition={imageUri != ""}
    >
      <Pressable
        style={[
          styles.uploadButton,
          imageUri != "" && { borderColor: colors.primary },
        ]}
        onPress={uploadImage}
      >
        {imageUri === "" ? (
          <Text style={styles.label}>Click to Upload</Text>
        ) : (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </Pressable>
      <Text style={styles.heading}>Everything starts with a picture!</Text>
      <Text style={styles.subheading}>
        Make a good first impression. Select a profile picture that will be the
        face of your account. Later on you will be able to change it and even
        upload more photos of you.
      </Text>
    </PrefRootLayout>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    width: "55%",
    aspectRatio: "10/16",
    borderWidth: 2,
    borderRadius: 16,
    borderStyle: "dashed",
    alignSelf: "center",
    borderColor: colors.textSecondary,
    marginBottom: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "95%",
    width: "93%",
    borderRadius: 15,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: "hn_regular",
  },
  heading: {
    fontSize: 20,
    fontFamily: "hn_medium",
    textAlign: "center",
    color: colors.textPrimary,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "hn_regular",
    color: colors.textSecondary,
    textAlign: "center",
    paddingLeft: "5%",
    paddingRight: "5%",
    alignSelf: "center",
    marginBottom: "10%",
  },
});

export default Picture;
