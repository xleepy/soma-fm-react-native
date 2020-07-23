import React from "react";
import { useContext, useEffect, useState } from "react";
import { fetchXML } from "../../utils";
import { Header } from "../molecules/Header";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ChannelsContext, SelectedChannelContext } from "../../App";

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
  const channels = useContext(ChannelsContext);
  const channel = channels.find((ch) => ch.$.id === selectedChannel);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (channel) {
      const {
        $: { id },
      } = channel;
      fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
        setSongs(song);
      });
    }
  }, [channel]);

  if (!channel) {
    return <Text style={styles.channelNotFound}>Channel not found</Text>;
  }

  const { xlimage, title, largeimage, description } = channel;

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
        {songs.map(({ artist, album, title: songTitle }, idx) => (
          <View key={`${artist[0]}-${songTitle[0]}-${idx}`}>
            <Text
              style={{ color: "#fff" }}
            >{`${artist[0]}: ${songTitle[0]} - ${album[0]}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}