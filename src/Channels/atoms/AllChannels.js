import React from "react";
import { VirtualizedList, RefreshControl } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedVirtualizedList = Animated.createAnimatedComponent(
  VirtualizedList
);

export function AllChannels({
  data,
  renderItem,
  onRefresh,
  isFetching,
  ...rest
}) {
  return (
    <AnimatedVirtualizedList
      {...rest}
      data={data}
      keyExtractor={(item) => item.$.id}
      getItem={(channels, idx) => channels[idx]}
      initialNumToRender={5}
      getItemCount={(channels) => channels.length}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    />
  );
}
