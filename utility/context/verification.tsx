import { createContext, ReactNode, useState } from "react";
import * as ImagePickerTools from "expo-image-picker";

interface IDetailsPayload {
  birthYear: number;
  gender: "male" | "female";
  sexuality: "heterosexual" | "homosexual" | "bisexual" | "without_preference";
  latitude: number;
  longitude: number;
  locationNormalized: string;
  profilePic: ImagePickerTools.ImagePickerAsset;
}

interface IDetailsFlow {
  detailsPayload: IDetailsPayload;
  manageDetailsProperties: (
    key:
      | "gender"
      | "birthYear"
      | "sexuality"
      | "latitude"
      | "longitude"
      | "locationNormalized"
      | "profilePic",
    value: string | number | ImagePickerTools.ImagePickerAsset
  ) => void;
}

export const VerificationContext = createContext<IDetailsFlow>({
  detailsPayload: {
    birthYear: 1950,
    gender: "male",
    sexuality: "heterosexual",
    latitude: 0.0,
    longitude: 0.0,
    locationNormalized: "",
    profilePic: { uri: "", height: 100, width: 100 },
  },
  manageDetailsProperties: () => {},
});

const VerificationContextProvider: React.FC<{ children: ReactNode }> =
  function ({ children }) {
    const [userDetails, setUserDetails] = useState<IDetailsPayload>({
      birthYear: 1950,
      gender: "male",
      sexuality: "heterosexual",
      latitude: 0.0,
      longitude: 0.0,
      locationNormalized: "",
      profilePic: { uri: "", height: 100, width: 100 },
    });

    const manageDetailsProperties = function (
      key:
        | "gender"
        | "birthYear"
        | "sexuality"
        | "latitude"
        | "longitude"
        | "locationNormalized"
        | "profilePic",
      value: string | number | ImagePickerTools.ImagePickerAsset
    ) {
      setUserDetails((prevState) => {
        return {
          ...prevState,
          [key]: value,
        };
      });
    };

    const contextValue = {
      detailsPayload: userDetails,
      manageDetailsProperties,
    };

    return (
      <VerificationContext.Provider value={contextValue}>
        {children}
      </VerificationContext.Provider>
    );
  };

export default VerificationContextProvider;
