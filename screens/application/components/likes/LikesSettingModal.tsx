import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../../../../utility/colors";
import { API_ROOT } from "../../../../App";
import { useCharmrSelector } from "../../../../utility/store/store";
import { useDispatch } from "react-redux";
import { givenLikeRemover } from "../../../../utility/store/slices/account";
import Loading from "../../../others/Loading";

const LikesSettingsModal: React.FC<{
  name: string;
  likedId: string;
  selectedView: "likes" | "pending";
  onCloseModal: () => void;
}> = function ({ name, likedId, selectedView, onCloseModal }) {
  const dispatch = useDispatch();
  const { token } = useCharmrSelector((state) => state.authentication);
  const [localLoadingState, setLocalLoadingState] = useState(false);

  //#region Animation Config
  const slideDownAnimationRef = useRef(new Animated.Value(-100)).current;
  const fadeAnimimationRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideDownAnimationRef, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnimimationRef, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTogglePress = () => {
    Animated.parallel([
      Animated.timing(slideDownAnimationRef, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimimationRef, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onCloseModal();
    });
  };

  //#endregion

  const removeLike = async function () {
    try {
      setLocalLoadingState(true);
      const response = await fetch(
        `${API_ROOT}/swiping/remove-like?likedId=${likedId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        dispatch(givenLikeRemover(likedId));
        handleTogglePress();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLocalLoadingState(false);
    }
  };

  const viewRemoveLike = (
    <>
      <Text style={styles.modal_title}>Remove like</Text>
      <Text style={styles.message}>
        Do you want to remove {name} from your likes? He will be able to sent
        you a like back later on.
      </Text>
      <View style={styles.controlls}>
        <Pressable style={styles.button_layout} onPress={handleTogglePress}>
          <Text style={styles.button}>Cancel</Text>
        </Pressable>
        <Pressable
          style={[styles.button_layout, { backgroundColor: colors.primary }]}
          onPress={removeLike}
        >
          <Text style={[styles.button, { color: colors.secondaryBackground }]}>
            Remove Like
          </Text>
        </Pressable>
      </View>
    </>
  );

  const viewManageLike = (
    <>
      <Text style={styles.modal_title}>Act on your like</Text>
      <Text style={styles.message}>
        Do you want to match with {name}? If not, pass on them and they will be
        notified. You can also make that decision later.
      </Text>
      <View
        style={[
          styles.controlls,
          {
            flexDirection: "column",
            gap: 10,
            width: "90%",
            alignSelf: "center",
          },
        ]}
      >
        <Pressable
          style={[styles.button_layout, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.button, { color: colors.secondaryBackground }]}>
            🥰 Match
          </Text>
        </Pressable>
        <Pressable style={styles.button_layout} onPress={handleTogglePress}>
          <Text style={styles.button}>Act Later</Text>
        </Pressable>
        <Pressable
          style={[styles.button_layout, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.button, { color: colors.secondaryBackground }]}>
            😵 Pass
          </Text>
        </Pressable>
      </View>
    </>
  );

  return (
    <View style={styles.modal}>
      <Animated.View
        style={[
          { width: "100%", height: "100%" },
          { opacity: fadeAnimimationRef },
        ]}
      >
        <LinearGradient
          colors={["rgba(30,30,30,0)", `${colors.textPrimary}`]}
          start={[0, 1]}
          end={[0, 0]}
          style={styles.backdrop}
        >
          {localLoadingState ? (
            <Loading />
          ) : (
            <Animated.View
              style={[
                styles.settings,
                { transform: [{ translateY: slideDownAnimationRef }] },
              ]}
            >
              {selectedView === "likes" ? viewManageLike : viewRemoveLike}
            </Animated.View>
          )}
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 150,
  },
  settings: {
    width: "85%",
    marginHorizontal: "7.5%",
    position: "absolute",
    top: "30%",
    backgroundColor: colors.secondaryBackground,
    borderRadius: 12.5,
    padding: "5%",
  },
  modal_title: {
    fontFamily: "hn_medium",
    color: colors.primary,
    textAlign: "center",
    fontSize: 16.5,
  },
  message: {
    fontFamily: "hn_regular",
    color: colors.textSecondaryContrast,
    marginVertical: "6%",
    fontSize: 17,
    textAlign: "center",
    lineHeight: 20,
  },
  controlls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button_layout: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  button: {
    fontSize: 16.5,
    fontFamily: "hn_medium",
    color: colors.primary,
    paddingBottom: 1.5,
    textAlign: "center",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

export default LikesSettingsModal;
