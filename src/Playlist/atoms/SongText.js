import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    flexShrink: 1,
  },
});

export function SongText({ children, outerStyle = {} }) {
  return <Text style={{ ...outerStyle, ...styles.text }}>{children}</Text>;
}
