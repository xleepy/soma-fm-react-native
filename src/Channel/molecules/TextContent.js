import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    lineHeight: 17,
    marginBottom: 2,
  },
  text: {
    fontFamily: "Montserrat-SemiBold",
    color: "#999999",
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 4,
    includeFontPadding: true,
  },
});

export function TextContent({ title, listeners, description }) {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{`Listeners: ${listeners}`}</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
