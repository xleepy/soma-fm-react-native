import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import { Channels } from './Channels/Channels';
import { fetchXML } from './utils';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';
import { BottomBar } from './BottomBar';
import { Playlist } from './Playlist/ogranisms/Playlist';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export const ChannelsContext = React.createContext([]);
export const SelectedChannelContext = React.createContext();

export default function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  useEffect(() => {
    fetchXML('https://somafm.com/channels.xml').then(
      ({ channels: { channel } }) => {
        setChannels(channel);
      }
    );
  }, [setChannels]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeRouter>
      <ChannelsContext.Provider value={channels}>
        <SelectedChannelContext.Provider
          value={[selectedChannel, setSelectedChannel]}
        >
          <View style={styles.container}>
            <Route exact path="/">
              <Channels />
            </Route>
            <Route path="/player/:id">
              <Playlist />
            </Route>
            <StatusBar style="auto" />
            <BottomBar />
          </View>
        </SelectedChannelContext.Provider>
      </ChannelsContext.Provider>
    </NativeRouter>
  );
}
