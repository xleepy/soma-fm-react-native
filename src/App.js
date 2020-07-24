import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { Channels } from "./Channels/Channels";
import { fetchXML } from "./utils";
import { BottomBar } from "./BottomBar/BottomBar";
import { Playlist } from "./Playlist/ogranisms/Playlist";
import SplashScreen from "react-native-splash-screen";
import TrackPlayer from "react-native-track-player";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export const SelectedChannelContext = React.createContext();

TrackPlayer.registerPlaybackService(() => require("./Player/service.js"));

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState(null);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NativeRouter>
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
          <StatusBar
            backgroundColor="transparent"
            barStyle="default"
            translucent
          />
          <BottomBar />
        </View>
      </SelectedChannelContext.Provider>
    </NativeRouter>
  );
}
