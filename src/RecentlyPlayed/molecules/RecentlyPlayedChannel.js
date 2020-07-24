import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { ChannelImage } from "../atoms/ChannelImage";
import { ChannelName } from "../atoms/ChannelName";
import { useHistory } from "react-router";
import { useChannelSelect } from "../../utils";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginRight: 14,
  },
});

export function RecentlyPlayedChannel({ channel }) {
  const { image, title } = channel;
  const history = useHistory();
  const selectChannel = useChannelSelect(channel, () =>
    history.push(`/player/${channel.$.id}`)
  );
  return (
    <TouchableHighlight onPress={selectChannel}>
      <View style={styles.container}>
        <ChannelImage uri={image[0]} />
        <ChannelName name={title[0]} />
      </View>
    </TouchableHighlight>
  );
}
