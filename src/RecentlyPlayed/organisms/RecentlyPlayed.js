import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { RecentlyPlayedChannel } from "../molecules/RecentlyPlayedChannel";
import { getRecentlyPlayed } from "../utils";
import styled from "styled-components";

const Container = styled.View`
  margin-bottom: 16px;
`;

const Title = styled.Text`
  color: #fff;
  margin-top: 24px;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 14px;
`;

export function RecentlyPlayed() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getRecentlyPlayed().then(setItems);
  }, []);

  const renderItem = ({ item }) => <RecentlyPlayedChannel channel={item} />;

  return items.length === 0 ? null : (
    <Container>
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
