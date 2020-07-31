import { View, Text, Linking } from "react-native";
import React from "react";
import { Image } from "react-native";
import { SongText } from "../atoms/SongText";
import "intl";
import "intl/locale-data/jsonp/en";
import styled from "styled-components";
import {
  MenuTrigger,
  MenuOption,
  Menu,
  MenuOptions,
} from "react-native-popup-menu";

// TODO: move to generic components
const ContainerRow = styled.View`
  flex-direction: row;
  padding: 4px 0;
  justify-content: space-between;
  margin-bottom: 10px;
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
      <View style={{ flexShrink: 1, paddingRight: 10 }}>
        <SongText type="primary">{title[0]}</SongText>
        <SongText>{artist[0]}</SongText>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <SongText type="primary">{`${formattedDate}`}</SongText>
        <Menu>
          <MenuTrigger style={{ height: 32, width: 32, alignItems: "center" }}>
            <Image
              style={{
                marginLeft: 14,
                alignSelf: "center",
              }}
              width={5}
              height={20}
              source={require("../../../assets/icons/dots.png")}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text="Spotify"
              onSelect={() => {
                Linking.openURL(
                  `https://api.spotify.com/v1/search?q=track:${title[0]}&artist:${artist[0]}&type=album`
                );
              }}
            />
          </MenuOptions>
        </Menu>
      </View>
    </ContainerRow>
  );
}
