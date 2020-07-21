import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { TouchableHighlight } from 'react-native-gesture-handler';
import { SelectedChannelContext } from '../App';

const styles = StyleSheet.create({
  btn: {
    padding: 5,
    borderRadius: 9999,
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  btnPlay: {
    borderColor: '#fff',
  },
  btnStop: {
    borderColor: '#FF0000',
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

const playIcon = require('../../assets/icons/play.png');
const stopIcon = require('../../assets/icons/stop.png');

export function Player() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const playback = useMemo(() => new Audio.Sound(), []);

  const [latestChannel, setLatestChannel] = useState(null);
  const [isPlaying, setPlayingStatus] = useState(false);

  const play = async () => {
    if (!selectedChannel) {
      return;
    }
    let status = await playback.getStatusAsync();
    if (status.isLoaded) {
      await playback.stopAsync();
      await playback.unloadAsync();
    }

    status = await playback.loadAsync({
      uri: `https://ice5.somafm.com/${selectedChannel}-128-mp3`,
    });
    if (status.isLoaded) {
      await playback.playAsync();
      setPlayingStatus(true);
    }
  };

  const stop = async () => {
    await playback.stopAsync();
    setPlayingStatus(false);
  };

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, stop, play]);

  useEffect(() => {
    if (!selectedChannel) {
      return;
    }
    if (isPlaying && selectedChannel != latestChannel) {
      setLatestChannel(selectedChannel);
      play();
    }
  }, [selectedChannel, isPlaying, setLatestChannel]);

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
