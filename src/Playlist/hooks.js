import { useState } from "react";
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
        return Promise.reject(new Error("Channel not selected"));
      }
      return fetchSongs(selectedChannel.$.id);
    },
    setSongs,
    (err) => console.log(err),
    [selectedChannel]
  );

  return [songs, isFetching, refresh];
}
