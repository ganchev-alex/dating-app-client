import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { SwipeCardData } from "../interfaces/data_types";

interface IAccount {
  filters: {
    locationRadius: number;
    gender: "male" | "female" | "both";
    ageRange: number[];
  };
  fetchedDataStorage: {
    deck: SwipeCardData[];
  };
  swipingHistory: {
    actionType: "like" | "pass" | "super_like";
    likedId: string;
  }[];
  initiliazeFilters: Dispatch<
    SetStateAction<{
      locationRadius: number;
      gender: "male" | "female" | "both";
      ageRange: number[];
    }>
  >;
  filterModifier: (
    key: "locationRadius" | "gender" | "ageRange",
    value: number | "male" | "female" | "both" | number[]
  ) => void;
  modifyFetchedDataStorage: (key: "deck", value: SwipeCardData[]) => void;
  appendToSwipingHistory: (action: {
    actionType: "like" | "pass" | "super_like";
    likedId: string;
  }) => void;
  revertFromSwipingHistory: () => void;
  resetSwipingHistory: () => void;
}

export const AccountContext = createContext<IAccount>({
  filters: {
    locationRadius: 0,
    gender: "both",
    ageRange: [],
  },
  fetchedDataStorage: {
    deck: [],
  },
  swipingHistory: [],
  initiliazeFilters: () => {},
  filterModifier: () => {},
  modifyFetchedDataStorage: (key: "deck", value: SwipeCardData[]) => {},
  appendToSwipingHistory: (action: {
    actionType: "like" | "pass" | "super_like";
    likedId: string;
  }) => {},
  revertFromSwipingHistory: () => {},
  resetSwipingHistory: () => {},
});

const AccountContextProvider: React.FC<{ children: ReactNode }> = function ({
  children,
}) {
  const [filters, setFilters] = useState<{
    locationRadius: number;
    gender: "male" | "female" | "both";
    ageRange: number[];
  }>({
    locationRadius: 0,
    gender: "both",
    ageRange: [],
  });
  const [fetchedDataStorage, setFetchedDataStorage] = useState<{
    deck: SwipeCardData[];
  }>({ deck: [] });
  const [swipingHistory, setSwipingHistory] = useState<
    {
      actionType: "like" | "pass" | "super_like";
      likedId: string;
    }[]
  >([]);

  const filterProvider = function (
    key: "locationRadius" | "gender" | "ageRange",
    value: Number | "male" | "female" | "both" | Number[]
  ) {
    setFilters((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const modifyFetchedDataStorageProvider = function (
    key: "deck",
    value: SwipeCardData[]
  ) {
    setFetchedDataStorage((prevStorage) => {
      return {
        ...prevStorage,
        [key]: value,
      };
    });
  };

  const appendToSwipingHistory = function (action: {
    actionType: "like" | "pass" | "super_like";
    likedId: string;
  }) {
    setSwipingHistory((prevState) => [...prevState, action]);
  };

  const revertFromSwipingHistory = function () {
    setSwipingHistory((prevState) => {
      if (prevState.length === 0) return prevState;
      return [...prevState.slice(0, -1)];
    });
  };

  const valueProvider: IAccount = {
    filters,
    fetchedDataStorage: fetchedDataStorage,
    swipingHistory,
    initiliazeFilters: setFilters,
    filterModifier: filterProvider,
    modifyFetchedDataStorage: modifyFetchedDataStorageProvider,
    appendToSwipingHistory,
    revertFromSwipingHistory,
    resetSwipingHistory: () => setSwipingHistory([]),
  };

  return (
    <AccountContext.Provider value={valueProvider}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContextProvider;
