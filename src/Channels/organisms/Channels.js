import React, { useEffect, useCallback, useState } from "react";
import { ButtonRow } from "../molecules/ButtonRow";
import { useChannels, useSortedChannels } from "../hooks";
import { RecentlyPlayed } from "../../RecentlyPlayed/organisms/RecentlyPlayed";
import { Sections } from "../atoms/Sections";
import { AllChannels } from "../atoms/AllChannels";
import styled from "styled-components";
import { Channel } from "../../Channel/organisms/Channel";
import { APP_WHITE_COLOR } from "../../constants";

const Container = styled.View`
  margin-top: 24px;
  flex: 1;
`;

const StationsTitle = styled.Text`
  color: ${APP_WHITE_COLOR};
  font-size: 18px;
  line-height: 22px;
`;

const renderChannel = (onFavoritePress) => ({ item }) => {
  return <Channel channel={item} onFavoritePress={onFavoritePress} />;
};

export function Channels() {
  const [channels, toggleChannelFavorite] = useChannels();
  const [{ type, data }, dispatch] = useSortedChannels(channels);

  return (
    <Container>
      <RecentlyPlayed />
      <StationsTitle>Stations</StationsTitle>
      <ButtonRow currentType={type} dispatch={dispatch} />
      {type === "genre" && (
        <Sections
          data={data}
          renderItem={renderChannel(toggleChannelFavorite)}
        />
      )}
      {type !== "genre" && (
        <AllChannels
          data={data}
          renderItem={renderChannel(toggleChannelFavorite)}
        />
      )}
    </Container>
  );
}
