import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { ChannelImage } from "../atoms/ChannelImage";
import { ChannelName } from "../atoms/ChannelName";
import { useHistory } from "react-router";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginRight: 14,
  },
});

export function RecentlyPlayedChannel({
  channel: {
    title,
    image,
    $: { id },
  },
}) {
  const history = useHistory();
  return (
    <TouchableHighlight onPress={() => history.push(`/player/${id}`)}>
      <View style={styles.container}>
        <ChannelImage uri={image[0]} />
        <ChannelName name={title[0]} />
      </View>
    </TouchableHighlight>
  );
}
