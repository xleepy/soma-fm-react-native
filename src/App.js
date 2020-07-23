import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { Channels } from "./Channels/Channels";
import { fetchXML } from "./utils";
import { BottomBar } from "./BottomBar";
import { Playlist } from "./Playlist/ogranisms/Playlist";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export const ChannelsContext = React.createContext([]);
export const SelectedChannelContext = React.createContext();

export default function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    fetchXML("https://somafm.com/channels.xml").then(
      ({ channels: { channel } }) => {
        setChannels(channel);
      }
    );
  }, [setChannels]);

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
            <StatusBar backgroundColor="transparent" barStyle="default" />
            <BottomBar />
          </View>
        </SelectedChannelContext.Provider>
      </ChannelsContext.Provider>
    </NativeRouter>
  );
}
