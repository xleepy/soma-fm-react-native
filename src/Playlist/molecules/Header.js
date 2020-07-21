import React from 'react';
import { ImageContainer } from '../atoms/ImageContainer';
import { Image, StyleSheet } from 'react-native';
import { ChannelDescription } from './ChannelDescription';

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  backgroundImage: {
    position: 'absolute',
    left: -16,
    top: -32,
    bottom: 0,
    right: -16,
  },
});

export function Header({ largeimage, xlimage, description, title }) {
  return (
    <ImageContainer>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: largeimage,
        }}
        blurRadius={10}
      />
      <Image
        source={{
          uri: xlimage,
        }}
        style={styles.logo}
      />
      <ChannelDescription description={description} channelName={title} />
    </ImageContainer>
  );
}
