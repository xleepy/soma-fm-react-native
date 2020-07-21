import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    flexShrink: 1,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 2,
  },
  listeners: {
    fontFamily: 'Montserrat-Regular',
    color: '#999999',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#999999',
    includeFontPadding: true,
    flexShrink: 1,
  },
});

export function TextContent({ title, listeners, description }) {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.listeners}>{`Listeners: ${listeners}`}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}
