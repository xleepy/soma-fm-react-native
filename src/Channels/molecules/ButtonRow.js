import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "../atoms/Button";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
});

export function ButtonRow({
  currentType,
  onAllPress,
  onGengrePress,
  onByPopularityPress,
}) {
  return (
    <View style={styles.row}>
      <Button label="Favourite" />
      <Button
        isActive={currentType == "all"}
        onPress={onAllPress}
        label="All"
      />
      <Button
        isActive={currentType == "genre"}
        onPress={onGengrePress}
        label="By genre"
      />
      <Button
        isActive={currentType == "popularity"}
        onPress={onByPopularityPress}
        label="By Popularity"
      />
    </View>
  );
}
