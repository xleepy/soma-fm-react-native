import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Title } from "../atoms/Title";
import { RecentlyPlayedChannel } from "../molecules/RecentlyPlayedChannel";
import { getRecentlyPlayed } from "../utils";

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
});

export function RecentlyPlayed() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getRecentlyPlayed().then(setItems);
  }, []);
  const renderItem = ({ item }) => <RecentlyPlayedChannel channel={item} />;
  return items.length == 0 ? null : (
    <View style={styles.container}>
      <Title />
      <FlatList
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.$.id}
      />
    </View>
  );
}
