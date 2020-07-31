import { useState, useCallback } from "react";
import { fetchXML, useCancelableEffect } from "../utils";

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

async function fetchSongs(id) {
  return fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
    return song;
  });
}

export function useSongs(selectedChannel) {
  const [songs, setSongs] = useState([]);
  const [isFetching, setFetching] = useState(false);
  useCancelableEffect(
    (canceled) => {
      if (!selectedChannel) {
        return;
      }
      setFetching(true);
      fetchSongs(selectedChannel.$.id)
        .then((fetchedSongs) => {
          if (!canceled) {
            setSongs(fetchedSongs);
            setFetching(false);
          }
        })
        .catch((err) => {
          console.warn(err);
          setFetching(false);
        });
    },
    [selectedChannel]
  );

  // TODO: create fetch state handler or maybe use some package for example SWR
  const refresh = useCallback(() => {
    if (!selectedChannel) {
      return;
    }
    setFetching(true);
    fetchSongs(selectedChannel.$.id).then(setSongs);
    setFetching(false);
  }, [selectedChannel]);

  return [songs, isFetching, refresh];
}
