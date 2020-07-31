import React, { useState, useEffect } from "react";
import { FlatList, Animated } from "react-native";
import { RecentlyPlayedChannel } from "../molecules/RecentlyPlayedChannel";
import { getRecentlyPlayed } from "../utils";
import styled from "styled-components";
import { APP_WHITE_COLOR } from "../../constants";
import { useDataFetchEffect } from "../../utils";

const Container = styled(Animated.View)`
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

export function RecentlyPlayed({ isHidden = false }) {
  const [items, setItems] = useState([]);
  useDataFetchEffect(getRecentlyPlayed, setItems);

  const renderItem = ({ item }) => <RecentlyPlayedChannel channel={item} />;

  return (
    <Container isHidden={isHidden || items.length === 0}>
      <Title>Recently Played</Title>
      <FlatList
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.$.id}
      />
    </Container>
  );
}
