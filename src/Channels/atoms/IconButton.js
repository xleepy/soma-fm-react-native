import React from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';

const iconsMap = {
  home: {
    inactive: require('../../../assets/icons/home.png'),
    active: require('../../../assets/icons/home-active.png'),
  },
  playlist: {
    inactive: require('../../../assets/icons/playlist.png'),
    active: require('../../../assets/icons/playlist-active.png'),
  },
  settings: {
    inactive: require('../../../assets/icons/settings.png'),
    active: require('../../../assets/icons/settings-active.png'),
  },
  sleep: {
    inactive: require('../../../assets/icons/sleep.png'),
    active: require('../../../assets/icons/sleep-active.png'),
  },
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export function IconButton({ iconType, onPress, isActive }) {
  const { inactive, active } = iconsMap[iconType];
  const icon = isActive ? active : inactive;
  return (
    <TouchableHighlight onPress={onPress}>
      <Image style={styles.icon} source={icon} />
    </TouchableHighlight>
  );
}
