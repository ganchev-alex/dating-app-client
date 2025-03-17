import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeCard, SwipeCardData } from "../../interfaces/data_types";

interface IAccountDataManagementState {
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
  },
});

export const {
  filterInitiliazer,
  filterModifier,
  fetchedDataStorageModifier,
  swipingHistoryAppender,
  swipingHistoryReverter,
  swipingHistoryReseter,
} = accountDataManagementSlice.actions;
export default accountDataManagementSlice.reducer;
