import React, { useCallback, useRef, useState } from "react";
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

const RECENTLY_PLAYED_MAX_HEIGHT = 200;

const INITIAL_LIST_HEIGHT = 400;

const SCROLL_OFFSET = 800;

const Container = styled.View`
  margin-top: 24px;
  flex: 1;
`;

const StationsTitle = styled.Text`
  color: ${APP_WHITE_COLOR};
  font-size: 18px;
  line-height: 22px;
`;

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
    { useNativeDriver: true }
  );

  const isHidden = recentlyPlayedChannels.length === 0;

  const recentlyPlayedHeight = isHidden ? 0 : RECENTLY_PLAYED_MAX_HEIGHT;

  return (
    <Container>
      <Animated.View
        style={{
          display: isHidden ? "none" : "flex",
          opacity: hideAnim.interpolate({
            inputRange: [INITIAL_LIST_HEIGHT, SCROLL_OFFSET],
            outputRange: [1, 0],
            extrapolate: "clamp",
          }),
          height: hideAnim.interpolate({
            inputRange: [INITIAL_LIST_HEIGHT, SCROLL_OFFSET],
            outputRange: [recentlyPlayedHeight, 0],
            extrapolate: "clamp",
          }),
        }}
      >
        <RecentlyPlayed recentlyPlayedChannels={recentlyPlayedChannels} />
      </Animated.View>
      <StationsTitle>Stations</StationsTitle>
      <ButtonRow currentType={type} dispatch={dispatch} />
      {type === "genre" && (
        <Sections
          data={data}
          renderItem={renderChannel}
          isFetching={isFetching}
          onRefresh={refreshChannels}
          scrollEventThrottle={1}
          onScroll={animatedEvent}
        />
      )}
      {type !== "genre" && (
        <AllChannels
          scrollEventThrottle={1}
          onScroll={animatedEvent}
          data={data}
          renderItem={renderChannel}
          onRefresh={refreshChannels}
          isFetching={isFetching}
        />
      )}
    </Container>
  );
}
