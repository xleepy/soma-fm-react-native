import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "black",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 0.5,
    borderStyle: "solid",
    marginRight: 12,
    paddingHorizontal: 6,
    marginTop: 6,
    paddingVertical: 2,
    flexBasis: 25,
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    lineHeight: 17,
  },
  btnActive: {
    borderColor: "#ff0000",
  },
  textActive: {
    color: "#ff0000",
  },
});

export function Button({ label, onPress, isActive }) {
  const activeBtn = isActive ? styles.btnActive : {};
  const activeText = isActive ? styles.textActive : {};
  return (
    <TouchableHighlight
      style={{ ...styles.btn, ...activeBtn }}
      onPress={onPress}
    >
      <Text style={{ ...styles.text, ...activeText }}>{label}</Text>
    </TouchableHighlight>
  );
}
