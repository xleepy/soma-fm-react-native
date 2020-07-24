import React from "react";
import { SectionList, Text, StyleSheet } from "react-native";
import { Channel } from "../../Channel/organisms/Channel";

const styles = StyleSheet.create({
  sectionHeader: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    marginBottom: 16,
    letterSpacing: 1,
  },
});

export function Sections({ data }) {
  return (
    <SectionList
      sections={data}
      keyExtractor={(item) => item.$.id}
      renderItem={({ item }) => {
        return <Channel key={item.$.id} channel={item} />;
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <Text style={styles.sectionHeader}>{title}</Text>;
      }}
    />
  );
}
