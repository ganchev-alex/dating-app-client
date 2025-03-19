import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeCard, SwipeCardData } from "../../interfaces/data_types";

interface IAccountDataManagementState {
  loadedUserData: {
    credentials: {
      email: string;
      fullName: string;
      verification_status: boolean;
    };
    details: {
      knownAs: string;
      about: string;
      age: number;
      gender: "male" | "female";
      sexuality:
        | "heterosexual"
        | "homosexual"
        | "bisexual"
        | "without_preference";
      locationNormalized: string;
    };
    photos: string[];
  };
  fetchedDataStorage: {
    deck: SwipeCardData[];
    likesReceived: LikeCard[];
    likesGiven: LikeCard[];
  };
  filters: {
    locationRadius: number;
    gender: "male" | "female" | "both";
    ageRange: number[];
  };
  swipingHistory: {
    actionType: "like" | "pass" | "super_like";
    likedId: string;
  }[];
}

const initialState: IAccountDataManagementState = {
  loadedUserData: {
    credentials: {
      email: "",
      fullName: "",
      verification_status: false,
    },
    details: {
      knownAs: "",
      about: "",
      age: 18,
      gender: "male",
      sexuality: "heterosexual",
      locationNormalized: "",
    },
    photos: [],
  },
  fetchedDataStorage: {
    deck: [],
    likesReceived: [],
    likesGiven: [],
  },
  filters: {
    locationRadius: 30,
    gender: "both",
    ageRange: [18, 50],
  },
  swipingHistory: [],
};

const accountDataManagementSlice = createSlice({
  name: "account_data_management",
  initialState,
  reducers: {
    filterInitiliazer: (
      state,
      action: PayloadAction<{
        locationRadius: number;
        gender: "male" | "female" | "both";
        ageRange: number[];
      }>
    ) => {
      state.filters = { ...action.payload };
    },
    filterModifier: (
      state,
      action: PayloadAction<{
        key: keyof IAccountDataManagementState["filters"];
        value: IAccountDataManagementState["filters"][typeof action.payload.key];
      }>
    ) => {
      state.filters[action.payload.key] = action.payload.value as never;
    },
    fetchedDataStorageModifier: (
      state,
      action: PayloadAction<{
        key: keyof IAccountDataManagementState["fetchedDataStorage"];
        value: IAccountDataManagementState["fetchedDataStorage"][typeof action.payload.key];
      }>
    ) => {
      state.fetchedDataStorage[action.payload.key] = action.payload
        .value as any;
    },
    swipingHistoryAppender: (
      state,
      action: PayloadAction<{
        actionType: "like" | "pass" | "super_like";
        cardIndex: number;
      }>
    ) => {
      state.swipingHistory.push({
        actionType: action.payload.actionType,
        likedId: state.fetchedDataStorage.deck[action.payload.cardIndex].userId,
      });
    },
    swipingHistoryReverter: (state) => {
      state.swipingHistory.pop();
    },
    swipingHistoryReseter: (state) => {
      state.swipingHistory = [];
    },
    givenLikeRemover: (state, action: PayloadAction<string>) => {
      state.fetchedDataStorage.likesGiven =
        state.fetchedDataStorage.likesGiven.filter(
          (like) => like.userId != action.payload
        );
    },
  },
});

export const {
  filterInitiliazer,
  filterModifier,
  fetchedDataStorageModifier,
  swipingHistoryAppender,
  swipingHistoryReverter,
  swipingHistoryReseter,
  givenLikeRemover,
} = accountDataManagementSlice.actions;
export default accountDataManagementSlice.reducer;
