import React from "react";
import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginBottom: 4,
  },
});

export function ChannelImage({ uri }) {
  return (
    <Image
      style={styles.image}
      source={{
        uri,
      }}
    />
  );
}
