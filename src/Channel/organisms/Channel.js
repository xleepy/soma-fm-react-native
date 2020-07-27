import React from "react";
import { useHistory } from "react-router";
import { TouchableHighlight } from "react-native";
import { TextContent } from "../molecules/TextContent";
import { useChannelSelect } from "../../utils";
import styled from "styled-components";

const TrackImage = styled.Image`
  width: 62px;
  height: 62px;
  margin-right: 14px;
  border-radius: 8px;
`;

const ChannelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const AbsoluteContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 0;
`;

const FavoriteIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const favoriteIcon = require("../../../assets/icons/favorite-inactive.png");

export function Channel({ channel }) {
  const history = useHistory();
  const selectChannel = useChannelSelect(channel, () =>
    history.push(`/player/${channel.$.id}`)
  );

  const { title, xlimage, listeners, description } = channel;
  return (
    <TouchableHighlight onPress={selectChannel}>
      <ChannelContainer>
        <TrackImage
          source={{
            uri: xlimage[0],
          }}
        />
        <TextContent
          title={title[0]}
          listeners={listeners[0]}
          description={description[0]}
        />
        <AbsoluteContainer>
          <TouchableHighlight
            onPress={(event) => event.preventDefault()}
            style={{ width: "100%", height: "100%" }}
          >
            <FavoriteIcon source={favoriteIcon} />
          </TouchableHighlight>
        </AbsoluteContainer>
      </ChannelContainer>
    </TouchableHighlight>
  );
}
