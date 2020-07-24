import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  name: {
    fontFamily: "Montserrat-Bold",
    fontWeight: "bold",
    fontSize: 13,
    color: "#fff",
  },
});

export function ChannelName({ name }) {
  return <Text style={styles.name}>{name}</Text>;
}
