import React from 'react';
import { useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { fetchXML } from '../../utils';
import { Header } from '../molecules/Header';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { ChannelsContext } from '../../App';

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

const styles = StyleSheet.create({
  channelNotFound: {
    color: '#FF0002',
    flex: 1,
  },
});

export function Playlist() {
  const { id } = useParams();
  const channels = useContext(ChannelsContext);
  const channel = channels.find((ch) => ch.$.id === id);
  if (!channel) {
    return <Text style={styles.channelNotFound}>Channel not found</Text>;
  }
  const { xlimage, title, largeimage, description } = channel;

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
      setSongs(song);
    });
  }, [id]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        largeimage={largeimage[0]}
        xlimage={xlimage[0]}
        description={description[0]}
        title={title[0]}
      />
      <ScrollView style={{ flex: 1, paddingTop: 16, marginBottom: 16 }}>
        {songs.map(({ artist, album, title: songTitle }, idx) => (
          <View key={`${artist[0]}-${songTitle[0]}-${idx}`}>
            <Text
              style={{ color: '#fff' }}
            >{`${artist[0]}: ${songTitle[0]} - ${album[0]}`}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
