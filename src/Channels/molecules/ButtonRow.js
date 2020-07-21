import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
});

export function ButtonRow() {
  return (
    <View style={styles.row}>
      <Button label="Favourite" />
      <Button label="All" />
      <Button label="By genre" />
      <Button label="By Popularity" />
    </View>
  );
}
