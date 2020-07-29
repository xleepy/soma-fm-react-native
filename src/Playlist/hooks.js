import { useEffect, useState } from "react";
import { fetchXML } from "../utils";

const songsUrl = (channel) => `https://somafm.com/songs/${channel}.xml`;

async function fetchSongs(id) {
  return fetchXML(songsUrl(id)).then(({ songs: { song } }) => {
    return song;
  });
}

export function useSongs(selectedChannel) {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    let canceled = false;
    async function getFetchedSongs() {
      if (!selectedChannel) {
        return;
      }
      const {
        $: { id },
      } = selectedChannel;
      const fetchedSongs = await fetchSongs(id);
      if (!canceled) {
        setSongs(fetchedSongs);
      }
    }
    getFetchedSongs();
    // REF: interval issue https://github.com/facebook/react-native/issues/12981
    const interval = setTimeout(getFetchedSongs, 60000);
    return () => {
      canceled = true;
      clearTimeout(interval);
    };
  }, [selectedChannel]);

  return songs;
}
