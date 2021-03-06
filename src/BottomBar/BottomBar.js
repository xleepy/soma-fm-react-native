import React, { useCallback } from "react";
import { IconButton } from "./molecules/IconButton";
import { useHistory, useLocation } from "react-router";
import { Player } from "../Player/Player";
import styled from "styled-components";
import { useSelectedChannel } from "../Contexts/SelectedChannelProvider";

const Container = styled.View`
  height: 56px;
  margin: 0 -16px;
  flex-direction: row;
  align-items: center;
  position: relative;
  background-color: black;
  flex: none;
`;

const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export function BottomBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { selectedChannel } = useSelectedChannel();
  const navigateToHome = () => {
    history.push("/");
  };

  const navigateToPlayer = useCallback(() => {
    if (!pathname.includes("player")) {
      history.push(`/player`);
    }
  }, [pathname]);

  const navigateToTimer = () => {
    history.push("/timer");
  };

  const navigateToAbout = () => {
    history.push("/about");
  };

  const isHomeActive = pathname.length === 1 && pathname.startsWith("/");
  const isPlaylistActive = pathname.includes("/player");

  const isTimerActive = pathname.includes("/timer");
  const isAboutActive = pathname.includes("/about");

  return (
    <Container>
      <ButtonsContainer>
        <IconButton
          isActive={isHomeActive}
          onPress={navigateToHome}
          iconType="home"
        />
        <IconButton
          disabled={!selectedChannel}
          isActive={isPlaylistActive}
          onPress={navigateToPlayer}
          iconType="playlist"
        />
      </ButtonsContainer>
      <Player />
      <ButtonsContainer>
        <IconButton
          isActive={isTimerActive}
          onPress={navigateToTimer}
          iconType="settings"
        />
        <IconButton
          isActive={isAboutActive}
          onPress={navigateToAbout}
          iconType="sleep"
        />
      </ButtonsContainer>
    </Container>
  );
}
