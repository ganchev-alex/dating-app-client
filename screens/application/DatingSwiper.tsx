import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import LottieView from "lottie-react-native";
import {
  useCharmrDispatch,
  useCharmrSelector,
} from "../../utility/store/store";
import {
  fetchedDataStorageModifier,
  filterInitiliazer,
  swipingHistoryAppender,
  swipingHistoryReseter,
  swipingHistoryReverter,
} from "../../utility/store/slices/account";

import { LinearGradient } from "expo-linear-gradient";
import SwipingHeader from "./components/dating_swiper/SwipingHeader";
import SwipingControl from "./components/dating_swiper/SwipingControl";

import DeckBottom from "./components/dating_swiper/DeckBottom";
import DeckCheckPoint from "./components/dating_swiper/DeckCheckPoint";

import { API_ROOT } from "../../App";
import { ILoadUserRes } from "../../utility/interfaces/responses";
import { SwipeCardData } from "../../utility/interfaces/data_types";

import { colors } from "../../utility/colors";

const DatingSwiper = () => {
  const dispatch = useCharmrDispatch();
  const { token } = useCharmrSelector((state) => state.authentication);
  const { filters, swipingHistory, fetchedDataStorage } = useCharmrSelector(
    (state) => state.accountDataManager
  );

  const ref = useRef<SwiperCardRefType>();
  const [deckLoadingState, setDeckLocalLoadingState] = useState(false);

  //#region: Side Effects Managers
  useEffect(() => {
    console.log(token);
    const loadUser = async function () {
      try {
        const response = await fetch(`${API_ROOT}/retrieve/load-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const responseData: ILoadUserRes = await response.json();
          dispatch(
            filterInitiliazer({
              locationRadius: responseData.locationRadius,
              gender: responseData.gender,
              ageRange: responseData.ageRange,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, [token]);

  useEffect(() => {
    const delayBounce = setTimeout(() => {
      prepeareDeck();
    }, 500);

    return () => clearTimeout(delayBounce);
  }, [filters]);
  //#endregion

  //#region: Local Actions Definition
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
        dispatch(
          fetchedDataStorageModifier({ key: "deck", value: responseData })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeckLocalLoadingState(false);
    }
  };

  const saveSwipingActions = async function () {
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
        dispatch(swipingHistoryReseter());
        dispatch(fetchedDataStorageModifier({ key: "deck", value: [] }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  //#endregion

  //#region: Swiping Card Definition
  const swipingCardRenderer = useCallback((cardData: SwipeCardData) => {
    return (
      <View style={styles.card_layout}>
        <Image
          source={{ uri: cardData.profilePicture }}
          style={styles.profile_picture}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["#1E1E1E", "rgba(30,30,30,0)"]}
          start={[0, 1]}
          end={[0, 0]}
          style={styles.card_details}
        >
          <Text style={styles.card_title}>
            {cardData.name.split(" ")[0]}, {cardData.age}
          </Text>
          <Text style={styles.card_about}>{cardData.about}</Text>
          <Text style={styles.card_distance}>
            {cardData.distance == 0 ? 1 : cardData.distance} km. away
          </Text>
        </LinearGradient>
      </View>
    );
  }, []);
  //#endregion

  //#region: Overlay Swiping Labels Definition
  const overlayRight = useCallback(() => {
    return (
      <View
        style={[
          styles.swiping_overlay,
          {
            backgroundColor: colors.primary,
          },
        ]}
      />
    );
  }, []);

  const overlayLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.swiping_overlay,
          {
            backgroundColor: colors.dislikeButton,
          },
        ]}
      />
    );
  }, []);

  const overlayTop = useCallback(() => {
    return (
      <View
        style={[
          styles.swiping_overlay,
          {
            backgroundColor: colors.superlikeButton,
          },
        ]}
      />
    );
  }, []);
  //#endregion

  //#region: Swiper Settings Configuration
  const swiperConfigrations = {
    onSwipeRightSpringConfig: {
      damping: 5,
      stiffness: 300,
      mass: 1,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    },
    onSwipeLeftSpringConfig: {
      damping: 5,
      stiffness: 300,
      mass: 1,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    },
    onSwipeTopSpringConfig: {
      damping: 5,
      stiffness: 300,
      mass: 1,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
    },
  };

  const swiperActions = {
    onSwipeLeftManager: (cardIndex: number) =>
      dispatch(swipingHistoryAppender({ actionType: "pass", cardIndex })),
    onSwipeRigthManager: (cardIndex: number) =>
      dispatch(swipingHistoryAppender({ actionType: "like", cardIndex })),
    onSwipeTopManager: (cardIndex: number) =>
      dispatch(swipingHistoryAppender({ actionType: "super_like", cardIndex })),
  };

  //#endregion

  return (
    <GestureHandlerRootView style={styles.screen}>
      <SwipingHeader />
      {deckLoadingState ? (
        <LottieView
          style={{ width: "125%", flex: 1 }}
          source={require("../../assets/animations/fetchingUsersAnimation.json")}
          autoPlay
          loop
        />
      ) : swipingHistory.length === fetchedDataStorage.deck.length ? (
        fetchedDataStorage.deck.length < 15 ? (
          <DeckBottom onSaveSwipingActions={saveSwipingActions} />
        ) : (
          <DeckCheckPoint onSaveSwipingActions={saveSwipingActions} />
        )
      ) : (
        <View style={styles.deck_layout}>
          <Swiper
            ref={ref}
            cardStyle={styles.card_container}
            data={fetchedDataStorage.deck}
            renderCard={swipingCardRenderer}
            OverlayLabelRight={overlayRight}
            OverlayLabelLeft={overlayLeft}
            OverlayLabelTop={overlayTop}
            swipeRightSpringConfig={
              swiperConfigrations.onSwipeRightSpringConfig
            }
            swipeLeftSpringConfig={swiperConfigrations.onSwipeLeftSpringConfig}
            swipeTopSpringConfig={swiperConfigrations.onSwipeTopSpringConfig}
            onSwipeLeft={(i) => swiperActions.onSwipeLeftManager(i)}
            onSwipeRight={(i) => swiperActions.onSwipeRigthManager(i)}
            onSwipeTop={(i) => swiperActions.onSwipeTopManager(i)}
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
            dispatch(swipingHistoryReverter());
          }}
        />
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  deck_layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card_container: {
    width: "95%",
    height: "90%",
    borderRadius: 15,
    marginVertical: 20,
  },
  card_layout: {
    flex: 1,
    borderRadius: 15,
    width: "100%",
    position: "relative",
  },
  profile_picture: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  swiping_overlay: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  card_details: {
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
  card_title: {
    color: colors.secondaryBackground,
    fontFamily: "hn_medium",
    fontSize: 35,
  },
  card_about: {
    color: colors.secondaryBackground,
    fontFamily: "hn_regular",
    fontSize: 15.5,
  },
  card_distance: {
    color: colors.textSecondary,
    fontFamily: "hn_regular",
    fontSize: 14,
  },
});

export default DatingSwiper;
