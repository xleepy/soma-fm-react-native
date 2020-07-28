import React, { useEffect, useState, useCallback, useContext } from "react";

import { TouchableHighlight } from "react-native-gesture-handler";
import { SelectedChannelContext } from "../App";
import {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from "react-native-track-player";
import { usePlayerSetup, usePlayerControls } from "./hooks";
import styled from "styled-components";

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
  background-color: #000;
  border-color: ${({ isPlaying }) => (isPlaying ? "#ff0000" : "#fff")};
`;

const Icon = styled.Image`
  height: 18px;
  width: ${({ isPlaying }) => (isPlaying ? "18px" : "13px")};
`;

const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

export function Player() {
  const [selectedChannel] = useContext(SelectedChannelContext);

  const [latestChannel, setLatestChannel] = useState(null);
  const [playbackState, setPlaybackState] = useState(null);

  useTrackPlayerEvents(events, (event) => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn("An error occurred while playing the current track.");
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setPlaybackState(event.state);
    }
  });

  const [play, stop] = usePlayerControls(selectedChannel, (channel) =>
    setLatestChannel(channel)
  );

  const isPlaying = playbackState && playbackState === STATE_PLAYING;

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, stop, play]);

  usePlayerSetup();

  useEffect(() => {
    if (!selectedChannel || !latestChannel) {
      return;
    }
    if (isPlaying && selectedChannel.$.id !== latestChannel.$.id) {
      play();
    }
  }, [selectedChannel, isPlaying, setLatestChannel, latestChannel]);

  const icon = isPlaying ? stopIcon : playIcon;

  return (
    <TouchableHighlight onPress={togglePlay}>
      <PlayContainer isPlaying={isPlaying}>
        <Icon isPlaying={isPlaying} source={icon} />
      </PlayContainer>
    </TouchableHighlight>
  );
}
