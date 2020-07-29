import { View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { SongText } from "../atoms/SongText";
import "intl";
import "intl/locale-data/jsonp/en";
import styled from "styled-components";

// TODO: move to generic components
const ContainerRow = styled.View`
  flex-direction: row;
`;

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
});

const formatNumber = (number) => numberFormatter.format(number);

function getFormattedDateFromTimestamp(timestamp) {
  const parsedDate = new Date(Number(timestamp) * 1000);
  return `${formatNumber(parsedDate.getHours())}:${formatNumber(
    parsedDate.getMinutes()
  )}`;
}

export function Song({ song: { artist, title, date } }) {
  const formattedDate = getFormattedDateFromTimestamp(date[0]);
  return (
    <ContainerRow>
      <View style={{ flex: 1, flexShrink: 1, paddingRight: 10 }}>
        <SongText type="primary">{title[0]}</SongText>
        <SongText>{artist[0]}</SongText>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <SongText type="primary">{`${formattedDate}`}</SongText>
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
    </ContainerRow>
  );
}
