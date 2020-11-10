import React from "react";
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from "react-native-popup-menu";

import { Linking, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuTrigger: {
    marginLeft: 16,
    height: 32,
    width: 32,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export function PopupMenu({ song }) {
  const handleYoutubeSelect = () => {
    Linking.openURL(`https://www.youtube.com/results?search_query=${song}`);
  };
  const handleSpotifySelect = () => {
    Linking.openURL(`https://open.spotify.com/search/${song}`);
  };
  return (
    <Menu>
      <MenuTrigger style={styles.menuTrigger}>
        <Image
          width={5}
          height={20}
          source={require("../../../assets/icons/dots.png")}
        />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption text="Youtube" onSelect={handleYoutubeSelect} />
      </MenuOptions>
      <MenuOptions>
        <MenuOption text="Spotify" onSelect={handleSpotifySelect} />
      </MenuOptions>
    </Menu>
  );
}
