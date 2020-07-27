import React from "react";
import { TouchableHighlight } from "react-native";
import { ChannelImage } from "../atoms/ChannelImage";
import { useHistory } from "react-router";
import { useChannelSelect } from "../../utils";
import styled from "styled-components";

const Container = styled.View`
  flex-direction: column;
  margin-right: 14px;
`;

export const ChannelName = styled.Text`
  font-family: "Montserrat-Bold";
  font-weight: bold;
  font-size: 13px;
  color: #fff;
`;

export function RecentlyPlayedChannel({ channel }) {
  const { image, title } = channel;
  const history = useHistory();
  const selectChannel = useChannelSelect(channel, () =>
    history.push(`/player/${channel.$.id}`)
  );
  return (
    <TouchableHighlight onPress={selectChannel}>
      <Container>
        <ChannelImage uri={image[0]} />
        <ChannelName>{title[0]}</ChannelName>
      </Container>
    </TouchableHighlight>
  );
}
