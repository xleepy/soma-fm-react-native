import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  VirtualizedList,
  SectionList,
} from "react-native";
import { Channel } from "../Channel/organisms/Channel";
import { ButtonRow } from "./molecules/ButtonRow";
import { useChannels, useSortedChannels } from "./hooks";
import { RecentlyPlayed } from "../RecentlyPlayed/organisms/RecentlyPlayed";
import { Sections } from "./molecules/Sections";
import { AllChannels } from "./molecules/AllChannels";

const styles = StyleSheet.create({
  channelsContainer: {
    flex: 1,
  },
  title: {
    marginTop: 16,
    color: "#FF0002",
    fontSize: 28,
    lineHeight: 34,
    textAlign: "center",
  },
  stationsTitle: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 14,
  },
});

export function Channels() {
  const channels = useChannels();
  const [{ type, data }, dispatch] = useSortedChannels(channels);
  const handleAllPress = useCallback(() => {
    dispatch({ type: "all", data: channels });
  }, [channels]);
  const handleByGenrePress = useCallback(() => {
    dispatch({ type: "genre", data: channels });
  }, [channels]);

  const hanleByPopularityPress = useCallback(() => {
    dispatch({ type: "popularity", data: channels });
  }, [channels]);
  return (
    <View style={styles.channelsContainer}>
      <Text style={styles.title}>Soma FM</Text>
      <RecentlyPlayed />
      <Text style={styles.stationsTitle}>Stations</Text>
      <ButtonRow
        currentType={type}
        onAllPress={handleAllPress}
        onGengrePress={handleByGenrePress}
        onByPopularityPress={hanleByPopularityPress}
      />
      {type == "genre" && <Sections data={data} />}
      {type != "genre" && <AllChannels data={data} />}
    </View>
  );
}
