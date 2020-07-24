import React from "react";
import { useContext, useEffect, useState } from "react";
import { fetchXML } from "../../utils";
import { Header } from "../molecules/Header";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SelectedChannelContext } from "../../App";
import { Song } from "../molecules/Song";

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

const styles = StyleSheet.create({
  channelNotFound: {
    color: "#FF0002",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export function Playlist() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (selectedChannel) {
      const {
        $: { id },
      } = selectedChannel;
      fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
        setSongs(song);
      });
    }
  }, [selectedChannel]);

  if (!selectedChannel) {
    return <Text style={styles.channelNotFound}>Channel not found</Text>;
  }

  const { xlimage, title, largeimage, description } = selectedChannel;

  return (
    <View style={{ flex: 1 }}>
      <Header
        largeimage={largeimage[0]}
        xlimage={xlimage[0]}
        description={description[0]}
        title={title[0]}
      />
      {/* TODO: for now ugly list of songs, rewrite */}
      <ScrollView style={{ flex: 1, paddingTop: 16, marginBottom: 16 }}>
        {songs.map((song, idx) => (
          <Song key={idx} song={song} />
        ))}
      </ScrollView>
    </View>
  );
}
