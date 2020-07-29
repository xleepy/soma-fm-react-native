import React from "react";
import styled from "styled-components";
import { APP_RED_COLOR, APP_WHITE_COLOR } from "../../constants";

const Container = styled.View`
  flex: 1;
  flex-shrink: 1;
`;

const Title = styled.Text`
  color: ${({ isPlaying }) => (isPlaying ? APP_RED_COLOR : APP_WHITE_COLOR)};
  font-family: "Montserrat-Bold";
  font-size: 14px;
  line-height: 17px;
  margin-bottom: 2px;
`;

const StyledText = styled.Text`
  font-family: "Montserrat-SemiBold";
  color: #999999;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 4px;
`;

export function TextContent({ title, listeners, description, isPlaying }) {
  return (
    <Container>
      <Title isPlaying={isPlaying}>{title}</Title>
      <StyledText>{`Listeners: ${listeners}`}</StyledText>
      <StyledText>{description}</StyledText>
    </Container>
  );
}
