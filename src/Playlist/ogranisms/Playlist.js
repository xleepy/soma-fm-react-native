import React from "react";
import { useContext } from "react";
import { Header } from "../molecules/Header";
import { ScrollView, RefreshControl } from "react-native";
import { SelectedChannelContext } from "../../App";
import { Song } from "../molecules/Song";
import styled from "styled-components";
import { useSongs } from "../hooks";
import { MenuProvider } from "react-native-popup-menu";

const ChannelNotFound = styled.Text`
  color: #ff0002;
  flex: 1;
  height: 100%;
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
`;

export function Playlist() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const [songs, isFetching, refresh] = useSongs(selectedChannel);

  if (!selectedChannel) {
    return <ChannelNotFound>Please select channel</ChannelNotFound>;
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
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refresh} />
        }
      >
        {songs.map((song, idx) => (
          <Song key={idx} song={song} />
        ))}
      </ScrollView>
    </Container>
  );
}
