import React from "react";
import { FlatList, View } from "react-native";
import { RecentlyPlayedChannel } from "../molecules/RecentlyPlayedChannel";
import styled from "styled-components";
import { APP_WHITE_COLOR } from "../../constants";

const Container = styled(View)`
  margin-bottom: 16px;
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
`;

const Title = styled.Text`
  color: ${APP_WHITE_COLOR};
  margin-top: 24px;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 14px;
`;

const renderItem = ({ item }) => <RecentlyPlayedChannel channel={item} />;

export function RecentlyPlayed({ recentlyPlayedChannels }) {
  return (
    <Container>
      <Title>Recently Played</Title>
      <FlatList
        horizontal
        data={recentlyPlayedChannels}
        renderItem={renderItem}
        keyExtractor={(item) => item.$.id}
      />
    </Container>
  );
}
