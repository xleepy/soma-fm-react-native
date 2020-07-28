import React, { useCallback, useContext } from "react";
import { IconButton } from "../Channels/atoms/IconButton";
import { useHistory, useLocation } from "react-router";
import { Player } from "../Player/Player";
import { SelectedChannelContext } from "../App";
import styled from "styled-components";

const Container = styled.View`
  height: 56px;
  margin: 0 -16px;
  flex-direction: row;
  align-items: center;
  position: relative;
  border-color: #f00;
  border-style: solid;
  border-top-width: 1px;
`;

const ButtonsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 20px;
  align-items: center;
`;

const AbsoluteBtnContainer = styled.View`
  position: absolute;
  left: 45%;
  top: -20px;
`;

export function BottomBar() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const navigateToHome = useCallback(() => {
    history.push("/");
  }, []);

  const navigateToPlayer = useCallback(() => {
    if (selectedChannel && !pathname.includes("player")) {
      history.push(`player/${selectedChannel}`);
    }
  }, [selectedChannel, pathname]);

  const isHomeActive = pathname.length === 1 && pathname.startsWith("/");
  const isPlaylistActive = pathname.includes("/player/");

  return (
    <Container>
      <ButtonsContainer>
        <IconButton
          isActive={isHomeActive}
          onPress={navigateToHome}
          iconType="home"
        />
        <IconButton
          isActive={isPlaylistActive}
          onPress={navigateToPlayer}
          iconType="playlist"
        />
      </ButtonsContainer>
      <ButtonsContainer>
        <IconButton iconType="settings" />
        <IconButton iconType="sleep" />
      </ButtonsContainer>
      <AbsoluteBtnContainer>
        <Player />
      </AbsoluteBtnContainer>
    </Container>
  );
}
