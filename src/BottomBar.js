import React, { useCallback, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { IconButton } from "./Channels/atoms/IconButton";
import { useHistory, useLocation } from "react-router";
import { Player } from "./Player/Player";
import { SelectedChannelContext } from "./App";

const styles = StyleSheet.create({
  container: {
    height: 56,
    marginHorizontal: -16,
    flexDirection: "row",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-around",
    position: "relative",
    borderColor: "#FF0000",
    borderStyle: "solid",
    borderTopWidth: 1,
  },
  absoluteBtn: {
    position: "absolute",
    top: -17,
    left: "45%",
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});

export function BottomBar() {
  const [selectedChannel] = useContext(SelectedChannelContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const navigateToHome = useCallback(() => {
    history.push("/");
  }, []);

  const navigateToPlayer = useCallback(() => {
    if (selectedChannel && !pathname.includes("player")) {
      history.push(`player/${selectedChannel}`);
    }
  }, [selectedChannel, pathname]);

  const isHomeActive = pathname.length == 1 && pathname.startsWith("/");
  const isPlaylistActive = pathname.includes("/player/");

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <IconButton
          isActive={isHomeActive}
          onPress={navigateToHome}
          iconType="home"
        />
        <IconButton
          isActive={isPlaylistActive}
          onPress={navigateToPlayer}
          iconType="playlist"
        />
      </View>
      <View style={styles.btnContainer}>
        <IconButton iconType="settings" />
        <IconButton iconType="sleep" />
      </View>
      <View style={styles.absoluteBtn}>
        <Player />
      </View>
    </View>
  );
}
