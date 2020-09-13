import React from "react";
import {
  Menu,
  MenuTrigger,
  MenuOption,
  MenuOptions,
} from "react-native-popup-menu";
import { useCallback } from "react";
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
  const handleYoutubeSelect = useCallback(() => {
    Linking.openURL(`https://www.youtube.com/results?search_query=${song}`);
  }, []);
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
    </Menu>
  );
}