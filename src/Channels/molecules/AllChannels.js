import React from "react";
import { VirtualizedList } from "react-native";

export function AllChannels({ data, renderItem }) {
  return (
    <VirtualizedList
      data={data}
      keyExtractor={(item) => item.$.id}
      getItem={(channels, idx) => channels[idx]}
      getItemCount={(channels) => channels.length}
      renderItem={renderItem}
    />
  );
}
