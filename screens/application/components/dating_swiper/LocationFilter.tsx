import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pressable, TextInput, FlatList } from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../../utility/colors";

const defaultResult = {
  city: "Sofia",
  country: "Bulgaria",
  latitude: 0.0,
  longitude: 0.0,
};

const LocationFilter: React.FC = function () {
  const [userQuery, setUserQuery] = useState(
    `${defaultResult.city}, ${defaultResult.country}`
  );
  const [selectedResult, setSelectedResult] = useState(defaultResult);
  const [results, setResults] = useState<string[]>([]);

  const fetchResults = async function (text: string) {
    setUserQuery(text);
    setSelectedResult(defaultResult);

    if (text.length < 3) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${text}&format=json&limit=3`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.log();
    }
  };

  const handleResultSelect = function (result: any) {
    const deconstructedLocationParts = result.display_name.split(", ");

    setSelectedResult({
      city: deconstructedLocationParts[0],
      country:
        deconstructedLocationParts[deconstructedLocationParts.length - 1],
      latitude: result.lat,
      longitude: result.lon,
    });

    setUserQuery(
      `${deconstructedLocationParts[0]}, ${
        deconstructedLocationParts[deconstructedLocationParts.length - 1]
      }`
    );
    setResults([]);
  };

  return (
    <View style={styles.input_wrapper}>
      <Text style={styles.label}>Location</Text>
      <Icon name="location-dot" size={28.5} color={colors.textSecondary} />
      <TextInput
        value={userQuery}
        onChangeText={fetchResults}
        style={styles.input}
      />
      <FlatList
        data={results}
        keyExtractor={(item: any) => item.place_id.toString()}
        style={styles.resultsWrapper}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => handleResultSelect(item)}>
              <Text>{item.display_name}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input_wrapper: {
    borderWidth: 1.5,
    borderColor: colors.textSecondary,
    width: "100%",
    height: 42.5,
    position: "relative",
    borderRadius: 8.5,
    flexDirection: "row",
  },
  label: {
    position: "absolute",
    top: "-62.5%",
    left: "1.75%",
    fontSize: 14.5,
    color: colors.textSecondaryContrast,
    fontFamily: "hn_medium",
  },
  input: {
    fontFamily: "hn_medium",
    color: colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "red",
  },
  resultsWrapper: {
    borderWidth: 1,
    borderColor: "blue",
    position: "absolute",
  },
});

export default LocationFilter;
