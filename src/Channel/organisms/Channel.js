import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useCallback } from "react";
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { TextContent } from "../molecules/TextContent";
import { SelectedChannelContext } from "../../App";

const styles = StyleSheet.create({
  trackImage: {
    width: 62,
    height: 62,
    marginRight: 14,
    borderRadius: 8,
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
  },
});

export function Channel({ channel }) {
  const [, setChannel] = useContext(SelectedChannelContext);
  const history = useHistory();
  const redirectToPlayer = useCallback(() => {
    setChannel(channel);
    history.push(`player/${channel.$.id}`);
  }, []);

  const { title, xlimage, listeners, description } = channel;
  return (
    <TouchableHighlight onPress={redirectToPlayer}>
      <View style={styles.channelContainer}>
        <Image
          source={{
            uri: xlimage[0],
          }}
          style={styles.trackImage}
        />
        <TextContent
          title={title[0]}
          listeners={listeners[0]}
          description={description[0]}
        />
      </View>
    </TouchableHighlight>
  );
}
