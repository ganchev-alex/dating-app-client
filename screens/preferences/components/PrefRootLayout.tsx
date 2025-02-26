import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

const PrefRootLayout: React.FC<{ children: ReactNode }> = function ({
  children,
}) {
  return (
    <View style={styles.root}>
      <Text>Set up your profile</Text>
      <Text>Help us getting to know you</Text>
      <View>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "grey",
    flex: 1,
  },
});

export default PrefRootLayout;
