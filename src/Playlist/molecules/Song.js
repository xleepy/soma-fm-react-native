import { View } from "react-native";
import React from "react";
import { StyleSheet, Image } from "react-native";
import { SongText } from "../atoms/SongText";
import "intl";
import "intl/locale-data/jsonp/en";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 14,
  },
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
});

const formatNumber = (number) => numberFormatter.format(number);

function getFormattedDateFromTimestamp(timestamp) {
  const parsedDate = new Date(parseInt(timestamp) * 1000);
  return `${formatNumber(parsedDate.getHours())}:${formatNumber(
    parsedDate.getMinutes()
  )}`;
}

export function Song({ song: { artist, title, date } }) {
  const formattedDate = getFormattedDateFromTimestamp(date[0]);
  return (
    <View style={styles.row}>
      <View style={{ flex: 1, flexShrink: 1, paddingRight: 10 }}>
        <SongText>{title[0]}</SongText>
        <SongText>{artist[0]}</SongText>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <SongText>{`${formattedDate}`}</SongText>
        <Image
          style={{
            marginLeft: 13,
            alignSelf: "center",
          }}
          width={4}
          height={20}
          source={require("../../../assets/icons/dots.png")}
        />
      </View>
    </View>
  );
}
