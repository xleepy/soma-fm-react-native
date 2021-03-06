import React from "react";
import styled from "styled-components";
import { APP_WHITE_COLOR } from "../../constants";

const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  flex-wrap: wrap;
  flex-direction: column;
`;

const BasicText = styled.Text`
  color: ${APP_WHITE_COLOR};
  font-family: "Montserrat-Regular";
`;

const Name = styled(BasicText)`
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const Description = styled(BasicText)`
  margin-top: 4px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 500;
  flex-shrink: 1;
  max-width: 300px;
`;

export function ChannelDescription({ channelName, description }) {
  return (
    <Container>
      <Name>{channelName}</Name>
      <Description>{description}</Description>
    </Container>
  );
}
