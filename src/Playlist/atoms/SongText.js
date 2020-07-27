import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    flexShrink: 1,
    marginBottom: 8,
  },
});

export function SongText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}
