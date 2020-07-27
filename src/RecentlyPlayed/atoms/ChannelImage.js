import React from "react";
import styled from "styled-components";

const StyledImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

export function ChannelImage({ uri }) {
  return (
    <StyledImage
      source={{
        uri,
      }}
    />
  );
}
