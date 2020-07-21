import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 16,
    right: 0,
    flex: 1,
    width: '100%',
    maxWidth: 400,
    flexWrap: 'wrap',
    flexShrink: 1,
    flexDirection: 'column',
  },
  channelName: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginBottom: 4,
  },
  description: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
    flexShrink: 1,
    maxWidth: 300,
  },
});

export function ChannelDescription({ channelName, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.channelName}>{channelName}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
