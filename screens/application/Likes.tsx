import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import LikesPreview from "./components/likes/LikePreview";
import Heading from "./components/likes/Heading";
import Preview from "./components/likes/Preview";

import {
  useCharmrDispatch,
  useCharmrSelector,
} from "../../utility/store/store";

import { colors } from "../../utility/colors";
import { API_ROOT } from "../../App";
import { LikeCard } from "../../utility/interfaces/data_types";
import { fetchedDataStorageModifier } from "../../utility/store/slices/account";

const Likes: React.FC = function () {
  const dispatch = useCharmrDispatch();
  const { token } = useCharmrSelector((state) => state.authentication);
  const { likesReceived, likesGiven, deck } = useCharmrSelector(
    (state) => state.accountDataManager.fetchedDataStorage
  );

  const [selectedLikesCollection, setSelectedLikesCollection] = useState<{
    source: LikeCard[];
    view: "likes" | "pending";
  }>({
    source: likesReceived,
    view: "likes",
  });

  useEffect(() => {
    fetchLikes();
  }, [deck]);

  const fetchLikes = async function () {
    try {
      const response = await fetch(`${API_ROOT}/retrieve/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData: {
          likesGiven: LikeCard[];
          likesReceived: LikeCard[];
        } = await response.json();

        dispatch(
          fetchedDataStorageModifier({
            key: "likesGiven",
            value: responseData.likesGiven,
          })
        );
        dispatch(
          fetchedDataStorageModifier({
            key: "likesReceived",
            value: responseData.likesReceived,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlatList
      numColumns={2}
      style={styles.grid}
      data={selectedLikesCollection.source}
      renderItem={({ item }) => <LikesPreview like={item} />}
      ListHeaderComponent={
        <>
          <Heading
            selectedView={selectedLikesCollection.view}
            onChangeDistributionToRecieved={() =>
              setSelectedLikesCollection({
                view: "likes",
                source: likesReceived,
              })
            }
            onChangeDistributionToGiven={() =>
              setSelectedLikesCollection({
                view: "pending",
                source: likesGiven,
              })
            }
          />
          <Preview selectedView={selectedLikesCollection.view} />
        </>
      }
      ListFooterComponent={<View style={{ height: 25, width: "100%" }} />}
    />
  );
};

const styles = StyleSheet.create({
  title_wrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "92%",
    marginHorizontal: "4%",
    marginTop: "2.5%",
  },
  line: {
    height: 1,
    backgroundColor: colors.textSecondary,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "hn_regular",
    color: colors.textSecondary,
    marginHorizontal: 6,
  },
  grid: {
    padding: "3%",
    gap: 15,
  },
});

export default Likes;
