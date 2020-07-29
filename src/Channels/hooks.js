import { useEffect, useState, useReducer, useCallback } from "react";
import { fetchXML } from "../utils";
import AsyncStorage from "@react-native-community/async-storage";

async function getCachedChannels() {
  try {
    const jsonChannels = await AsyncStorage.getItem("@channels");
    return jsonChannels ? JSON.parse(jsonChannels) : [];
  } catch (err) {
    console.warn("error reading cache", err);
    return [];
  }
}

async function cacheChannels(channels) {
  try {
    const cachedChannels = await getCachedChannels();
    if (cachedChannels.length > 0) {
      await AsyncStorage.removeItem("@channels");
    }
    const jsonChannels = JSON.stringify(channels);
    await AsyncStorage.setItem("@channels", jsonChannels);
    await AsyncStorage.setItem("@fetch-timestamp", Date.now().toString());
  } catch (err) {
    console.warn("saving error", err);
  }
}

async function getLatestFetchTimestamp() {
  const timestamp = await AsyncStorage.getItem("@fetch-timestamp");
  return timestamp ? Number(timestamp) : null;
}

async function fetchChannels() {
  const cachedChannels = await getCachedChannels();
  const latestFetchTimeStamp = await getLatestFetchTimestamp();
  // latest fetch timestamp + 30 min offset to refetch again on component mount
  const shouldUpdate =
    !!latestFetchTimeStamp &&
    latestFetchTimeStamp + 30 * 60000 - Date.now() <= 0;

  if (cachedChannels.length === 0 || shouldUpdate) {
    return fetchXML("https://somafm.com/channels.xml").then(
      ({ channels: { channel } }) => {
        const modifiedChannels = channel.map((ch) => {
          const cachedChannel = cachedChannels.find((c) => c.$.id === ch.$.id);
          if (cachedChannel) {
            return {
              ...cachedChannel,
              ...ch,
            };
          }
          return {
            ...ch,
            isFavorite: false,
          };
        });
        cacheChannels(modifiedChannels);
        return modifiedChannels;
      }
    );
  }
  return Promise.resolve(cachedChannels);
}

export function useChannels() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    let canceled = false;
    async function getChannels() {
      const fetchedChannels = await fetchChannels();
      if (!canceled) {
        setChannels(fetchedChannels);
      }
    }
    getChannels();
    return () => {
      canceled = true;
    };
  }, []);

  const toggleChannelFavorite = (id) => {
    const modifiedChannels = channels.map((ch) => {
      if (ch.$.id === id) {
        return {
          ...ch,
          isFavorite: !ch.isFavorite,
        };
      }
      return ch;
    });
    cacheChannels(modifiedChannels);
    setChannels(modifiedChannels);
  };
  return [channels, toggleChannelFavorite];
}

function createSections(sections, channel) {
  const genre = channel.genre[0].split("|")[0];
  const existingSectionIdx = sections.findIndex((s) => s.title === genre);
  if (existingSectionIdx !== -1) {
    const channels = sections[existingSectionIdx].data.slice();
    sections[existingSectionIdx].data = [...channels, channel];
    return sections;
  }
  return [
    ...sections,
    {
      title: genre,
      data: [channel],
    },
  ];
}

function sortByListeners(a, b) {
  return Number(b.listeners[0]) - Number(a.listeners[0]);
}

function reducer(state, action) {
  switch (action.type) {
    case "all": {
      return {
        type: "all",
        data: action.data,
      };
    }
    case "favorite": {
      return {
        type: "favorite",
        data: action.data.filter((channel) => channel.isFavorite),
      };
    }
    case "genre":
      return {
        type: "genre",
        data: action.data.reduce(createSections, []),
      };
    case "popularity": {
      return {
        type: "popularity",
        data: action.data.slice().sort(sortByListeners),
      };
    }
    default:
      return state;
  }
}
export function useSortedChannels(channels) {
  // TODO: think about better implementation of sorting and toggling favorite btn
  const [latestSortType, setSortType] = useState("all");
  const [sortedChannels, dispatch] = useReducer(reducer, {
    type: "all",
    data: [],
  });

  useEffect(() => {
    dispatch({ type: latestSortType, data: channels });
  }, [channels]);

  const channelsDispatch = (type) => {
    setSortType(type);
    dispatch({ type, data: channels });
  };

  return [sortedChannels, channelsDispatch];
}
