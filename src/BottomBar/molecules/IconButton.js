import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import styled from "styled-components";

const iconsMap = {
  home: {
    inactive: require("../../../assets/icons/home.png"),
    active: require("../../../assets/icons/home-active.png"),
  },
  playlist: {
    inactive: require("../../../assets/icons/playlist.png"),
    active: require("../../../assets/icons/playlist-active.png"),
  },
  settings: {
    inactive: require("../../../assets/icons/settings.png"),
    active: require("../../../assets/icons/settings-active.png"),
  },
  sleep: {
    inactive: require("../../../assets/icons/sleep.png"),
    active: require("../../../assets/icons/sleep-active.png"),
  },
};

const IconContainer = styled.View`
  width: 75px;
  height: 55px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

export function IconButton({ iconType, onPress, isActive, disabled }) {
  const { inactive, active } = iconsMap[iconType];
  const icon = isActive ? active : inactive;
  return (
    <TouchableHighlight disabled={disabled} onPress={onPress}>
      <IconContainer>
        <Icon source={icon} />
      </IconContainer>
    </TouchableHighlight>
  );
}
