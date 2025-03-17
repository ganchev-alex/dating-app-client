import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as ImagePickerTools from "expo-image-picker";

interface IDetailsManagementState {
  verification: {
    birthYear: number;
    gender: "male" | "female" | "";
    sexuality:
      | "heterosexual"
      | "homosexual"
      | "bisexual"
      | "without_preference"
      | "";
    latitude: number;
    longitude: number;
    locationNormalized: string;
    profilePic: ImagePickerTools.ImagePickerAsset;
  };
}

const initialState: IDetailsManagementState = {
  verification: {
    birthYear: 1950,
    gender: "",
    sexuality: "",
    latitude: 0.0,
    longitude: 0.0,
    locationNormalized: "",
    profilePic: { uri: "", height: 100, width: 100 },
  },
};

const detailsManagementSlice = createSlice({
  name: "details_management",
  initialState,
  reducers: {
    verificationStateModifier: (
      state,
      action: PayloadAction<{
        key: keyof IDetailsManagementState["verification"];
        value: IDetailsManagementState["verification"][typeof action.payload.key];
      }>
    ) => {
      state.verification[action.payload.key] = action.payload.value as never;
    },
  },
});

export const { verificationStateModifier } = detailsManagementSlice.actions;
export default detailsManagementSlice.reducer;
