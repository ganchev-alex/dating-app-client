import { Image, StyleSheet, Text, View } from "react-native";

const ChatPreview: React.FC = function () {
  return (
    <View style={style.container}>
      <Image />
      <View>
        <Text>Name</Text>
        <Text>
          A sample text message that should be only one line and should not
          overflow.
        </Text>
      </View>
      <View>
        <Text>12:52 pm. | 23.05 | Jan, 2023</Text>
        <Text>3</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "91%",
  },
});

export default ChatPreview;
