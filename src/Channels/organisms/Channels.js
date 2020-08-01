import React, { useEffect, useCallback, useState } from "react";
import { ButtonRow } from "../molecules/ButtonRow";
import { useChannels, useSortedChannels } from "../hooks";
import { RecentlyPlayed } from "../../RecentlyPlayed/organisms/RecentlyPlayed";
import { Sections } from "../atoms/Sections";
import { AllChannels } from "../atoms/AllChannels";
import styled from "styled-components";
import { Channel } from "../../Channel/organisms/Channel";
import { APP_WHITE_COLOR } from "../../constants";
import { ActivityIndicator } from "react-native";
import { useCurrentPlayingChannel } from "../../Player/hooks";

const Container = styled.View`
  margin-top: 24px;
  flex: 1;
`;

const StationsTitle = styled.Text`
  color: ${APP_WHITE_COLOR};
  font-size: 18px;
  line-height: 22px;
`;

const renderChannel = (onFavoritePress, isChannelPlaying) => ({ item }) => {
  return (
    <Channel
      channel={item}
      onFavoritePress={onFavoritePress}
      isChannelPlaying={isChannelPlaying}
    />
  );
};

export function Channels() {
  const [
    { type, data },
    dispatch,
    toggleChannelFavorite,
    refreshChannels,
    isFetching,
  ] = useChannels();

  const currentlyPlaingChannel = useCurrentPlayingChannel();

  const isChannelPlaying = useCallback(
    (channelId) => {
      return currentlyPlaingChannel === channelId;
    },
    [currentlyPlaingChannel]
  );

  return (
    <Container>
      <RecentlyPlayed />
      <StationsTitle>Stations</StationsTitle>
      <ButtonRow currentType={type} dispatch={dispatch} />
      {type === "genre" && (
        <Sections
          data={data}
          renderItem={renderChannel(toggleChannelFavorite, isChannelPlaying)}
          isFetching={isFetching}
          onRefresh={refreshChannels}
        />
      )}
      {type !== "genre" && (
        <AllChannels
          data={data}
          renderItem={renderChannel(toggleChannelFavorite, isChannelPlaying)}
          onRefresh={refreshChannels}
          isFetching={isFetching}
        />
      )}
    </Container>
  );
}
