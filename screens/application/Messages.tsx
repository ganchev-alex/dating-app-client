import { StyleSheet, Text, View, ViewBase } from "react-native";
import MessagesHeader from "./components/messages/MessageHeader";
import { colors } from "../../utility/colors";
import ChatPreview from "./components/messages/ChatPreview";

const Messages: React.FC = function () {
  return (
    <View style={styles.screen}>
      <MessagesHeader />
      <View style={styles.main}>
        <ChatPreview />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  main: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.primaryBackground,
    marginTop: "-8%",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});

export default Messages;
