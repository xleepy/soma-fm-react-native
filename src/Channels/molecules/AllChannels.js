import React from "react";
import { VirtualizedList } from "react-native";
import { Channel } from "../../Channel/organisms/Channel";

export function AllChannels({ data }) {
  return (
    <VirtualizedList
      data={data}
      keyExtractor={(item) => item.$.id}
      getItem={(channels, idx) => channels[idx]}
      getItemCount={(channels) => channels.length}
      renderItem={({ item }) => {
        return <Channel channel={item} />;
      }}
    />
  );
}
