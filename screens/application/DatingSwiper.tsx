import { useCallback, useRef } from "react";
import {
  ImageSourcePropType,
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import SwipingControl from "./components/dating_swiper/SwipingControl";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../../utility/colors";

const dummyData = [
  {
    name: "Max",
    age: "25",
    about:
      "Adventurer at heart, foodie by choice, and a lover of spontaneous road trips – let’s find new places and new flavors together!",
    image: require("../../assets/profiles/profile_1.jpg"),
  },
  {
    name: "Elise",
    age: "26",
    about:
      "Always up for a good laugh, deep conversations, and exploring the little things in life. Looking for someone to share those moments with.",
    image: require("../../assets/profiles/profile_2.jpg"),
  },
  {
    name: "Jhon",
    age: "23",
    about:
      "Coffee enthusiast, bookworm, and professional dog petter – swipe right if you're ready for some cozy nights and great conversation!",
    image: require("../../assets/profiles/profile_3.jpg"),
  },
];

const Main = () => {
  const ref = useRef<SwiperCardRefType>();

  const renderCard = useCallback(
    (userData: {
      name: string;
      age: string;
      about: string;
      image: ImageSourcePropType;
    }) => {
      return (
        <View style={styles.cardLayout}>
          <Image
            source={userData.image}
            style={styles.renderCardImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["#1E1E1E", "rgba(30,30,30,0)"]}
            start={[0, 1]}
            end={[0, 0]}
            style={styles.cardDetails}
          >
            <Text style={styles.prime}>
              {userData.name}, {userData.age}
            </Text>
            <Text style={styles.about}>{userData.about}</Text>
          </LinearGradient>
        </View>
      );
    },
    []
  );
  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: colors.primary,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: colors.dislikeButton,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelTop = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: colors.superlikeButton,
          },
        ]}
      />
    );
  }, []);
  const OverlayLabelBottom = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: colors.superlikeButton,
          },
        ]}
      />
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          cardStyle={styles.cardStyle}
          data={dummyData}
          renderCard={renderCard}
          loop={true}
          onSwipeRight={(cardIndex) => {
            console.log("cardIndex", cardIndex);
          }}
          onSwipeLeft={(cardIndex) => {
            console.log("onSwipeLeft", cardIndex);
          }}
          onSwipeTop={(cardIndex) => {
            console.log("onSwipeTop", cardIndex);
          }}
          onSwipeBottom={(cardIndex) => {
            console.log("onSwipeBottom", cardIndex);
          }}
          OverlayLabelRight={OverlayLabelRight}
          OverlayLabelLeft={OverlayLabelLeft}
          OverlayLabelTop={OverlayLabelTop}
          OverlayLabelBottom={OverlayLabelBottom}
          swipeRightSpringConfig={{
            damping: 5,
            stiffness: 300,
            mass: 1,
            overshootClamping: true,
            restDisplacementThreshold: 0.1,
            restSpeedThreshold: 0.1,
          }}
          swipeLeftSpringConfig={{
            damping: 5,
            stiffness: 300,
            mass: 1,
            overshootClamping: true,
            restDisplacementThreshold: 0.1,
            restSpeedThreshold: 0.1,
          }}
          swipeTopSpringConfig={{
            damping: 5,
            stiffness: 300,
            mass: 1,
            overshootClamping: true,
            restDisplacementThreshold: 0.1,
            restSpeedThreshold: 0.1,
          }}
        />
      </View>

      <SwipingControl
        onSwipeLeft={() => ref.current?.swipeLeft()}
        onSwipeRight={() => ref.current?.swipeRight()}
        onSwipeTop={() => ref.current?.swipeTop()}
        onSwipeBack={() => ref.current?.swipeBack()}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardStyle: {
    width: "95%",
    height: "90%",
    borderRadius: 15,
    marginVertical: 20,
  },
  cardLayout: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    position: "relative",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  cardDetails: {
    position: "absolute",
    width: "100%",
    height: "35%",
    left: 0,
    bottom: 0,
    borderRadius: 15,
    paddingHorizontal: "6.5%",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  prime: {
    color: colors.secondaryBackground,
    fontFamily: "hn_regular",
    fontSize: 35,
  },
  about: {
    color: colors.secondaryBackground,
    fontFamily: "hn_regular",
    fontSize: 15,
  },
});

export default Main;
