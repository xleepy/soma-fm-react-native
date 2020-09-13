import React from "react";
import { TouchableHighlight } from "react-native";
import { TextContent } from "../molecules/TextContent";
import { useSelectChannelAndRedirect } from "../../utils";
import styled from "styled-components";
import { FavoriteIconBtn } from "../molecules/FavoriteIconBtn";
import { useCurrentPlayingChannel } from "../../Player/hooks";

const TrackImage = styled.Image`
  width: 62px;
  height: 62px;
  margin-right: 14px;
  border-radius: 8px;
`;

const ChannelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const AbsoluteContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 0;
`;

export function Channel({ channel, onFavoritePress }) {
  const selectChannel = useSelectChannelAndRedirect(channel);
  const {
    title,
    xlimage,
    listeners,
    description,
    isFavorite,
    $: { id },
  } = channel;

  const currentlyPlaingChannel = useCurrentPlayingChannel();

  const isPlaying = currentlyPlaingChannel === id;

  return (
    <TouchableHighlight onPress={selectChannel}>
      <ChannelContainer>
        <TrackImage
          source={{
            uri: xlimage[0],
          }}
        />
        <TextContent
          isPlaying={isPlaying}
          title={title[0]}
          listeners={listeners[0]}
          description={description[0]}
        />
        <AbsoluteContainer>
          <FavoriteIconBtn
            onFavoritePress={onFavoritePress}
            isFavorite={isFavorite}
            channelId={id}
          />
        </AbsoluteContainer>
      </ChannelContainer>
    </TouchableHighlight>
  );
}
