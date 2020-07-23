import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Image, StyleSheet } from "react-native";

import { TouchableHighlight } from "react-native-gesture-handler";
import { SelectedChannelContext } from "../App";
import {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from "react-native-track-player";
import { usePlayerSetup, usePlayerControls } from "./hooks";

const styles = StyleSheet.create({
  btn: {
    padding: 5,
    borderRadius: 9999,
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  btnPlay: {
    borderColor: "#fff",
  },
  btnStop: {
    borderColor: "#FF0000",
  },
  icon: {
    height: 18,
  },
  iconPlay: {
    width: 13,
  },
  iconStop: {
    width: 18,
  },
});

function getConditionalStyles(isPlaying) {
  if (isPlaying) {
    return {
      styledBtn: styles.btnStop,
      styledIcon: styles.iconStop,
    };
  }
  return {
    styledBtn: styles.btnPlay,
    styledIcon: styles.iconPlay,
  };
}

const playIcon = require("../../assets/icons/play.png");
const stopIcon = require("../../assets/icons/stop.png");

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
    if (
      isPlaying &&
      latestChannel &&
      selectedChannel.$.id != latestChannel.$.id
    ) {
      setLatestChannel(selectedChannel);
      play();
    }
  }, [selectedChannel, isPlaying, setLatestChannel, latestChannel]);

  const icon = isPlaying ? stopIcon : playIcon;
  const { styledBtn, styledIcon } = getConditionalStyles(isPlaying);

  return (
    <TouchableHighlight onPress={togglePlay}>
      <View
        style={{
          ...styles.btn,
          ...styledBtn,
        }}
      >
        <Image
          style={{
            ...styles.icon,
            ...styledIcon,
          }}
          source={icon}
        />
      </View>
    </TouchableHighlight>
  );
}
