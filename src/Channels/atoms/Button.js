import React from 'react';
import { Button as NativeButton, StyleSheet, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 0.5,
    borderStyle: 'solid',
    marginRight: 16,
    paddingHorizontal: 6,
    marginTop: 6,
    paddingVertical: 2,
  },

  text: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 17,
  },
});

export function Button({ label, onPress }) {
  return (
    <TouchableHighlight style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableHighlight>
  );
}
