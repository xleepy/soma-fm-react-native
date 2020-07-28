import React from "react";
import { useContext, useEffect, useState } from "react";
import { fetchXML } from "../../utils";
import { Header } from "../molecules/Header";
import { ScrollView, View } from "react-native";
import { SelectedChannelContext } from "../../App";
import { Song } from "../molecules/Song";
import styled from "styled-components";

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

const ChannelNotFound = styled.Text`
  color: #ff0002;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
`;

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
    return <ChannelNotFound>Channel not found</ChannelNotFound>;
  }

  const { xlimage, title, largeimage, description } = selectedChannel;

  return (
    <Container>
      <Header
        largeimage={largeimage[0]}
        xlimage={xlimage[0]}
        description={description[0]}
        title={title[0]}
      />
      {/* TODO: for now ugly list of songs, rewrite */}
      <ScrollView style={{ flex: 1, marginVertical: 10, width: "100%" }}>
        {songs.map((song, idx) => (
          <Song key={idx} song={song} />
        ))}
      </ScrollView>
    </Container>
  );
}
