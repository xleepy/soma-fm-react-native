import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    marginTop: 24,
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 14,
  },
});

export function Title() {
  return <Text style={styles.title}>Recently Played</Text>;
}
