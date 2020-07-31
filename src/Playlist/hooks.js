import { useState, useCallback } from "react";
import { fetchXML, useDataFetchEffect } from "../utils";

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

async function fetchSongs(id) {
  return fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
    return song;
  });
}

export function useSongs(selectedChannel) {
  const [songs, setSongs] = useState([]);
  const [isFetching, refresh] = useDataFetchEffect(
    () => {
      if (!selectedChannel) {
        return Promise.reject("Channel not selected");
      }
      return fetchSongs(selectedChannel.$.id);
    },
    setSongs,
    [selectedChannel]
  );

  return [songs, isFetching, refresh];
}
