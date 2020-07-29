import React, { useState, useEffect, useRef } from "react";
import { FlatList, Animated } from "react-native";
import { RecentlyPlayedChannel } from "../molecules/RecentlyPlayedChannel";
import { getRecentlyPlayed } from "../utils";
import styled from "styled-components";

const Container = styled(Animated.View)`
  margin-bottom: 16px;
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getRecentlyPlayed().then(setItems);
  }, []);

  const renderItem = ({ item }) => <RecentlyPlayedChannel channel={item} />;

  return (
    <Container isHidden={items.length === 0}>
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
