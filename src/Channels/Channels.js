import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, VirtualizedList } from 'react-native';
import { Channel } from '../Channel/organisms/Channel';
import { ChannelsContext } from '../App';
import { ButtonRow } from './molecules/ButtonRow';

const styles = StyleSheet.create({
  channelsContainer: {
    flex: 1,
  },
  title: {
    marginTop: 16,
    color: '#FF0002',
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
  },
  stationsTitle: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 14,
  },
});

export function Channels() {
  const fetchedChannels = useContext(ChannelsContext);
  return (
    <View style={styles.channelsContainer}>
      <Text style={styles.title}>Soma FM</Text>
      <Text style={styles.stationsTitle}>Stations</Text>
      <ButtonRow />
      <VirtualizedList
        data={fetchedChannels}
        keyExtractor={(item) => item.$.id}
        getItem={(channels, idx) => channels[idx]}
        getItemCount={(channels) => channels.length}
        renderItem={({ item }) => {
          return <Channel key={item.$.id} channel={item} />;
        }}
      />
    </View>
  );
}