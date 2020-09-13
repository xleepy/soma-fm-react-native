import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { BottomBar } from "./BottomBar/BottomBar";
import SplashScreen from "react-native-splash-screen";
import TrackPlayer from "react-native-track-player";
import { Playlist } from "./Playlist/ogranisms/Playlist";
import styled from "styled-components";
import { Channels } from "./Channels";

import { usePlayerState } from "./Player/hooks";

const AppContainer = styled(SafeAreaView)`
  background-color: #000;
  flex: 1;
  justify-content: center;
  padding: 16px 16px 0 16px;
`;

export const SelectedChannelContext = React.createContext();

export const PlayerStateContext = React.createContext(0);

TrackPlayer.registerPlaybackService(() => require("./Player/service.js"));

export default function App() {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const playerState = usePlayerState();
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setBarStyle("light-content");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <NativeRouter>
      <SelectedChannelContext.Provider
        value={[selectedChannel, setSelectedChannel]}
      >
        <PlayerStateContext.Provider value={playerState}>
          <AppContainer>
            <Route exact path="/">
              <Channels />
            </Route>
            <Route path="/player">
              <Playlist />
            </Route>
            <StatusBar />
            <BottomBar />
          </AppContainer>
        </PlayerStateContext.Provider>
      </SelectedChannelContext.Provider>
    </NativeRouter>
  );
}
