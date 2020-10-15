import React, { useCallback, useEffect, useRef, useState } from "react";
import { ButtonRow } from "../molecules/ButtonRow";
import { useChannels } from "../hooks";
import { RecentlyPlayed } from "../../RecentlyPlayed/organisms/RecentlyPlayed";
import { Sections } from "../atoms/Sections";
import { AllChannels } from "../atoms/AllChannels";
import styled from "styled-components";
import { Channel } from "../../Channel/organisms/Channel";
import { APP_WHITE_COLOR } from "../../constants";
import Animated from "react-native-reanimated";
import { useDataFetchEffect } from "../../utils";
import { getRecentlyPlayed } from "../../RecentlyPlayed/utils";

const RECENTLY_PLAYED_MAX_HEIGHT = 260;

const MINIMAL_SCROLL_START = 350;
const LIST_HEIGHT = 500;

const SCROLL_OFFSET =
  LIST_HEIGHT + MINIMAL_SCROLL_START - RECENTLY_PLAYED_MAX_HEIGHT;

const Container = styled.View`
  margin-top: 24px;
  flex: 1;
`;

const StationsTitle = styled.Text`
  color: ${APP_WHITE_COLOR};
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 10px;
`;

const ChannelsContainer = styled.View`
  flex: 1;
  background-color: #000;
`;
export const scrollRangeForAnimation = 100;

export function Channels() {
  const hideAnim = useRef(new Animated.Value(0)).current;
  const [
    { type, data },
    dispatch,
    toggleChannelFavorite,
    refreshChannels,
    isFetching,
  ] = useChannels();

  const [recentlyPlayedChannels, setItems] = useState([]);
  useDataFetchEffect(getRecentlyPlayed, setItems);

  const renderChannel = useCallback(
    ({ item }) => (
      <Channel channel={item} onFavoritePress={toggleChannelFavorite} />
    ),
    []
  );

  const animatedEvent = Animated.event(
    [{ nativeEvent: { contentOffset: { y: hideAnim } } }],
    {
      useNativeDriver: true,
    }
  );

  const isHidden = recentlyPlayedChannels.length === 0;

  const maxHeight = isHidden ? 0 : RECENTLY_PLAYED_MAX_HEIGHT;

  const handleScroll = useCallback(
    (e) => {
      const scrollSensitivity = 4 / 3;
      const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
      hideAnim.setValue(offset);
    },
    [hideAnim]
  );

  const headerHeight = hideAnim.interpolate({
    inputRange: [MINIMAL_SCROLL_START, SCROLL_OFFSET],
    outputRange: [maxHeight, 0],
    extrapolate: "clamp",
  });

  const opacity = hideAnim.interpolate({
    inputRange: [MINIMAL_SCROLL_START, SCROLL_OFFSET],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <Container>
      <Animated.View
        style={{
          display: isHidden ? "none" : "flex",
          opacity,
          height: headerHeight,
        }}
      >
        <RecentlyPlayed recentlyPlayedChannels={recentlyPlayedChannels} />
        <ButtonRow currentType={type} dispatch={dispatch} />
      </Animated.View>
      <ChannelsContainer>
        <StationsTitle>Stations</StationsTitle>
        {type === "genre" && (
          <Sections
            data={data}
            renderItem={renderChannel}
            isFetching={isFetching}
            onRefresh={refreshChannels}
            scrollEventThrottle={1}
            onScroll={handleScroll}
          />
        )}
        {type !== "genre" && (
          <AllChannels
            scrollEventThrottle={1}
            onScroll={handleScroll}
            data={data}
            renderItem={renderChannel}
            onRefresh={refreshChannels}
            isFetching={isFetching}
          />
        )}
      </ChannelsContainer>
    </Container>
  );
}
