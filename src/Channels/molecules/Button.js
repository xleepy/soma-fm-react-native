import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import styled from "styled-components";
import {
  APP_RED_COLOR,
  APP_WHITE_COLOR,
  BACKGROUND_COLOR,
} from "../../constants";

const StyledText = styled.Text`
  color: ${({ isActive }) => (isActive ? APP_RED_COLOR : APP_WHITE_COLOR)};
  font-family: "Montserrat-Bold";
  font-size: 14px;
  text-align: center;
`;

const Container = styled.View`
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  border-color: ${({ isActive }) =>
    isActive ? APP_RED_COLOR : APP_WHITE_COLOR};
  border-width: 0.5px;
  margin-right: 12px;
  margin-top: 8px;
  border-style: solid;
  padding: 3px 6px;
`;

export function Button({ label, onPress, isActive }) {
  return (
    <TouchableHighlight onPress={onPress}>
      <Container isActive={isActive}>
        <StyledText isActive={isActive}>{label}</StyledText>
      </Container>
    </TouchableHighlight>
  );
}
