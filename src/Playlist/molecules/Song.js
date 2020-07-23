import { View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { SongText } from "../atoms/SongText";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexShrink: 1,
  },
});

export function Song({ song: { artist, title, date } }) {
  return (
    <View style={styles.row}>
      <SongText>{title[0]}</SongText>
      <SongText>{artist[0]}</SongText>
    </View>
  );
}
