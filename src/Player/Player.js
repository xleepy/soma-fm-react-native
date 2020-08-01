import React, { useEffect, useState, useCallback, useContext } from "react";

import { TouchableHighlight } from "react-native-gesture-handler";
import { SelectedChannelContext, PlayerStateContext } from "../App";
import {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
  STATE_BUFFERING,
} from "react-native-track-player";
import { usePlayerSetup, usePlayerControls, usePlayerState } from "./hooks";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";
import { APP_RED_COLOR, APP_WHITE_COLOR, BACKGROUND_COLOR } from "../constants";

const playIcon = require("../../assets/icons/play.png");
const stopIcon = require("../../assets/icons/stop.png");

const PlayContainer = styled.View`
  padding: 5px;
  border-radius: 100px;
  border-width: 1px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${BACKGROUND_COLOR};
  border-color: ${({ isPlaying }) =>
    isPlaying ? APP_RED_COLOR : APP_WHITE_COLOR};
`;

const Icon = styled.Image`
  height: 18px;
  width: ${({ isPlaying }) => (isPlaying ? "18px" : "13px")};
`;

export function Player() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const playerState = useContext(PlayerStateContext);

  const [latestChannel, setLatestChannel] = useState(null);

  const [play, stop] = usePlayerControls(selectedChannel, (channel) =>
    setLatestChannel(channel)
  );

  const isPlaying = playerState === STATE_PLAYING;
  const isBuffering = playerState === STATE_BUFFERING;

  const togglePlay = useCallback(() => {
    if (isPlaying || isBuffering) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, isBuffering]);

  usePlayerSetup();

  useEffect(() => {
    if (!selectedChannel) {
      return;
    }
    if (
      (!isPlaying && !latestChannel) ||
      (isPlaying && selectedChannel.$.id !== latestChannel.$.id)
    ) {
      play();
    }
  }, [selectedChannel, isPlaying, setLatestChannel, latestChannel]);

  const icon = isPlaying ? stopIcon : playIcon;

  return (
    <TouchableHighlight onPress={togglePlay}>
      <PlayContainer isPlaying={isPlaying || isBuffering}>
        {isBuffering && <ActivityIndicator size="small" color="#f00" />}
        {!isBuffering && <Icon isPlaying={isPlaying} source={icon} />}
      </PlayContainer>
    </TouchableHighlight>
  );
}
