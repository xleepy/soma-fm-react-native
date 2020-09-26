import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { BottomBar } from "./BottomBar/BottomBar";
import SplashScreen from "react-native-splash-screen";
import TrackPlayer from "react-native-track-player";
import { Playlist } from "./Playlist/ogranisms/Playlist";
import styled from "styled-components";
import { Channels } from "./Channels";

import { PlayerStateProvider } from "./Contexts/PlayerStateProvider";
import { SelectedChannelProvider } from "./Contexts/SelectedChannelProvider";

const AppContainer = styled(SafeAreaView)`
  background-color: #000;
  flex: 1;
  justify-content: center;
  padding: 16px 16px 0 16px;
`;

TrackPlayer.registerPlaybackService(() => require("./Player/service.js"));

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setBarStyle("light-content");
    StatusBar.setTranslucent(true);
  }, []);

  return (
    <NativeRouter>
      <PlayerStateProvider>
        <SelectedChannelProvider>
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
        </SelectedChannelProvider>
      </PlayerStateProvider>
    </NativeRouter>
  );
}
