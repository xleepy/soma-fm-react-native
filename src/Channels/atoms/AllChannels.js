import React from "react";
import { VirtualizedList, RefreshControl } from "react-native";

export function AllChannels({
  data,
  renderItem,
  onScroll,
  onRefresh,
  isFetching,
}) {
  return (
    <VirtualizedList
      data={data}
      keyExtractor={(item) => item.$.id}
      getItem={(channels, idx) => channels[idx]}
      initialNumToRender={5}
      getItemCount={(channels) => channels.length}
      renderItem={renderItem}
      onScroll={onScroll}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
      }
    />
  );
}
