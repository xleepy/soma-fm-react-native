import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { BottomBar } from "./BottomBar/BottomBar";
import SplashScreen from "react-native-splash-screen";
import TrackPlayer from "react-native-track-player";
import { Playlist } from "./Playlist/ogranisms/Playlist";
import styled from "styled-components";
import { Channels } from "./Channels";

const AppContainer = styled.View`
  background-color: #000;
  flex: 1;
  justify-content: center;
  padding: 16px 16px 0 16px;
`;

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
        <AppContainer>
          <Route exact path="/">
            <Channels />
          </Route>
          <Route path="/player">
            <Playlist />
          </Route>
          <StatusBar backgroundColor="transparent" translucent />
          <BottomBar />
        </AppContainer>
      </SelectedChannelContext.Provider>
    </NativeRouter>
  );
}
