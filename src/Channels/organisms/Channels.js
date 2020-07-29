import React from "react";
import { ButtonRow } from "../molecules/ButtonRow";
import { useChannels, useSortedChannels } from "../hooks";
import { RecentlyPlayed } from "../../RecentlyPlayed/organisms/RecentlyPlayed";
import { Sections } from "../molecules/Sections";
import { AllChannels } from "../molecules/AllChannels";
import styled from "styled-components";
import { Channel } from "../../Channel/organisms/Channel";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  flex: 1;
`;

const AppTitle = styled.Text`
  margin-top: 16px;
  color: #ff0002;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
`;

const StationsTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  line-height: 22px;
`;

const renderChannel = (onFavoriteClick) => ({ item }) => {
  return <Channel channel={item} onFavoriteClick={onFavoriteClick} />;
};

export function Channels() {
  const [channels, toggleChannelFavorite] = useChannels();
  const [{ type, data }, dispatch] = useSortedChannels(channels);
  return (
    <Container>
      <AppTitle>Soma FM</AppTitle>
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
