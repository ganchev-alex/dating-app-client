import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import LottieView from "lottie-react-native";

import { LinearGradient } from "expo-linear-gradient";
import SwipingHeader from "./components/dating_swiper/SwipingHeader";
import SwipingControl from "./components/dating_swiper/SwipingControl";

import { AccountContext } from "../../utility/context/account";
import { API_ROOT } from "../../App";
import { AuthenticationContext } from "../../utility/context/authentication";
import { ILoadUserRes } from "../../utility/interfaces/responses";
import { SwipeCardData } from "../../utility/interfaces/data_types";
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
  const {
    filters,
    fetchedDataStorage,
    swipingHistory,
    initiliazeFilters,
    modifyFetchedDataStorage,
    appendToSwipingHistory,
    revertFromSwipingHistory,
    resetSwipingHistory,
  } = useContext(AccountContext);
  const { token } = useContext(AuthenticationContext);
  const [deckLoadingState, setDeckLocalLoadingState] = useState(false);
  const ref = useRef<SwiperCardRefType>();

  const prepeareDeck = async function () {
    setDeckLocalLoadingState(true);
    try {
      const response = await fetch(`${API_ROOT}/swiping/deck`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...filters,
        }),
      });

      if (response.ok) {
        const responseData: SwipeCardData[] = await response.json();
        modifyFetchedDataStorage("deck", responseData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeckLocalLoadingState(false);
    }
  };

  const saveSwipingActions = async function () {
    console.log(swipingHistory);
    try {
      const response = await fetch(`${API_ROOT}/swiping/actions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(swipingHistory),
      });

      if (response.ok) {
        resetSwipingHistory();
        modifyFetchedDataStorage("deck", []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize the first deck based on whether the user has loaded.
  useEffect(() => {
    const loadUser = async function () {
      try {
        const response = await fetch(`${API_ROOT}/retrieve/load-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const responseData: ILoadUserRes = await response.json();
          initiliazeFilters(responseData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
    prepeareDeck();
  }, [token]);

  // Manage prepearing a new deck based on filter change.
  useEffect(() => {
    const delayBounce = setTimeout(() => {
      prepeareDeck();
    }, 500);

    return () => clearTimeout(delayBounce);
  }, [filters]);

  // Save Swiping Actions Upon Reaching the bottom of the deck.
  useEffect(() => {
    if (
      swipingHistory.length === fetchedDataStorage.deck.length &&
      swipingHistory.length != 0
    ) {
      saveSwipingActions();
    }
  }, [swipingHistory]);

  const renderCard = useCallback((cardData: SwipeCardData) => {
    return (
      <View style={styles.cardLayout}>
        <Image
          source={{ uri: cardData.profilePicture }}
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
            {cardData.name.split(" ")[0]}, {cardData.age}
          </Text>
          <Text style={styles.about}>{cardData.about}</Text>
          <Text style={styles.details}>
            {cardData.distance == 0 ? 1 : cardData.distance} km. away
          </Text>
        </LinearGradient>
      </View>
    );
  }, []);
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <SwipingHeader />
      {deckLoadingState ? (
        <LottieView
          style={{ width: "125%", flex: 1 }}
          source={require("../../assets/animations/fetchingUsersAnimation.json")}
          autoPlay
          loop
          speed={1}
        />
      ) : swipingHistory.length === fetchedDataStorage.deck.length ? (
        fetchedDataStorage.deck.length < 15 ? (
          <View style={styles.deck_button}>
            <Text style={styles.deck_bottom_title}>🤷‍♂️ Out of Profiles</Text>
            <Text style={styles.deck_bottom_details}>
              There are no more profiles in you area that match your selected
              preferences. Try tweaking the values of the filter or come back
              again later.
            </Text>
          </View>
        ) : (
          <View style={styles.deck_button}>
            <Text style={styles.deck_bottom_title}>🪄 Keep Swiping?</Text>
            <Text style={styles.deck_bottom_details}>
              You have reached the bottom of the deck. Do you want to get a new
              one with other profiles?
            </Text>
            <Pressable style={styles.deck_bottom_button}>
              <Text style={styles.deck_bottom_button_label}>
                Load a New Deck
              </Text>
            </Pressable>
          </View>
        )
      ) : (
        <View style={styles.deck}>
          <Swiper
            ref={ref}
            cardStyle={styles.cardStyle}
            data={fetchedDataStorage.deck}
            renderCard={renderCard}
            OverlayLabelRight={OverlayLabelRight}
            OverlayLabelLeft={OverlayLabelLeft}
            OverlayLabelTop={OverlayLabelTop}
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
            onSwipeLeft={(index) =>
              appendToSwipingHistory({
                actionType: "pass",
                likedId: fetchedDataStorage.deck[index].userId,
              })
            }
            onSwipeRight={(index) =>
              appendToSwipingHistory({
                actionType: "like",
                likedId: fetchedDataStorage.deck[index].userId,
              })
            }
            onSwipeTop={(index) =>
              appendToSwipingHistory({
                actionType: "super_like",
                likedId: fetchedDataStorage.deck[index].userId,
              })
            }
            disableBottomSwipe
          />
        </View>
      )}
      {swipingHistory.length !== fetchedDataStorage.deck.length && (
        <SwipingControl
          onSwipeLeft={() => ref.current?.swipeLeft()}
          onSwipeRight={() => ref.current?.swipeRight()}
          onSwipeTop={() => ref.current?.swipeTop()}
          onSwipeBack={() => {
            ref.current?.swipeBack();
            revertFromSwipingHistory();
          }}
        />
      )}
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
  deck: {
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
    height: "40%",
    left: 0,
    bottom: 0,
    borderRadius: 15,
    paddingHorizontal: "6.5%",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  prime: {
    color: colors.secondaryBackground,
    fontFamily: "hn_medium",
    fontSize: 35,
  },
  about: {
    color: colors.secondaryBackground,
    fontFamily: "hn_regular",
    fontSize: 15.5,
  },
  details: {
    color: colors.textSecondary,
    fontFamily: "hn_regular",
    fontSize: 14,
  },
  deck_button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "9.5%",
  },
  deck_bottom_title: {
    fontFamily: "hn_heavy",
    fontSize: 24,
    color: colors.textPrimary,
    textAlign: "center",
  },
  deck_bottom_details: {
    fontFamily: "hn_regular",
    fontSize: 18,
    textAlign: "center",
    color: colors.textSecondary,
  },
  deck_bottom_button: {
    backgroundColor: colors.primary,
    paddingVertical: "3%",
    paddingHorizontal: "14.5%",
    borderRadius: 15,
    marginTop: "7.5%",
  },
  deck_bottom_button_label: {
    fontFamily: "hn_medium",
    color: colors.secondaryBackground,
    fontSize: 18,
  },
});

export default Main;
