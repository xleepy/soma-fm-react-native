import React from "react";
import { ChannelDescription } from "./ChannelDescription";
import styled from "styled-components";

export const ImageContainer = styled.View`
  flex: 0.75;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  left: -16px;
  right: -16px;
  top: -32px;
  bottom: 0;
`;

const ChannelImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 8px;
`;

export function Header({ largeimage, xlimage, description, title }) {
  return (
    <ImageContainer>
      <BackgroundImage
        source={{
          uri: largeimage,
        }}
        blurRadius={10}
      />
      <ChannelImage
        source={{
          uri: xlimage,
        }}
      />
      <ChannelDescription description={description} channelName={title} />
    </ImageContainer>
  );
}
