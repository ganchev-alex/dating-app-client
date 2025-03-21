import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

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
import LikesSettingsModal from "./components/likes/LikesSettingModal";
import ProfilePreview from "./ProfilePreview";
import Loading from "../others/Loading";

const Likes: React.FC = function () {
  const dispatch = useCharmrDispatch();
  const { token } = useCharmrSelector((state) => state.authentication);
  const { likesReceived, likesGiven, deck } = useCharmrSelector(
    (state) => state.accountDataManager.fetchedDataStorage
  );

  const [modalState, setModalState] = useState<{
    visibility: boolean;
    name: string;
    id: string;
  }>({ visibility: false, name: "", id: "" });
  const [selectedLikesCollection, setSelectedLikesCollection] = useState<{
    source: LikeCard[];
    view: "likes" | "pending";
  }>({
    source: likesReceived,
    view: "likes",
  });
  const [loadingState, setLoadingState] = useState(false);
  const [previewId, setPreviewId] = useState("");

  useEffect(() => {
    fetchLikes();
  }, [deck]);

  const fetchLikes = async function () {
    setLoadingState(true);
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

        setSelectedLikesCollection({
          source: responseData.likesReceived,
          view: "likes",
        });

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
    } finally {
      setLoadingState(false);
    }
  };

  return loadingState ? (
    <Loading />
  ) : (
    <>
      {modalState.visibility && (
        <LikesSettingsModal
          selectedView={selectedLikesCollection.view}
          name={modalState.name}
          likedId={modalState.id}
          onCloseModal={() => {
            setModalState({ visibility: false, name: "", id: "" });
            setPreviewId("");
          }}
        />
      )}
      {previewId &&
        (selectedLikesCollection.view === "likes" ? (
          <ProfilePreview
            userId={previewId}
            previewMode="like"
            onDislike={setModalState}
            onReturn={() => setPreviewId("")}
          />
        ) : (
          <ProfilePreview
            userId={previewId}
            previewMode="pending"
            onDislike={setModalState}
            onReturn={() => setPreviewId("")}
          />
        ))}
      <FlatList
        numColumns={2}
        style={styles.grid}
        data={selectedLikesCollection.source}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: "50%" }}
            onPress={() => setPreviewId(item.userId)}
            onLongPress={() =>
              setModalState({
                visibility: true,
                name: item.name.split(" ")[0],
                id: item.userId,
              })
            }
          >
            <LikesPreview like={item} />
          </Pressable>
        )}
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
    </>
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
