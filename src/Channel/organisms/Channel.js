import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useCallback } from "react";
import { TouchableHighlight, View, Image, StyleSheet } from "react-native";
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
  absoluteContainer: {
    position: "absolute",
    right: 16,
    top: 0,
  },
  favoriteBtn: {
    width: 18,
    height: 18,
  },
});

const favoriteIcon = require("../../../assets/icons/favorite-inactive.png");

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
        <View style={styles.absoluteContainer}>
          <TouchableHighlight
            onPress={(event) => event.preventDefault()}
            style={{ width: "100%", height: "100%" }}
          >
            <Image style={styles.favoriteBtn} source={favoriteIcon} />
          </TouchableHighlight>
        </View>
      </View>
    </TouchableHighlight>
  );
}
