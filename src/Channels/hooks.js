import { useEffect, useState, useReducer } from "react";
import { fetchXML } from "../utils";
import AsyncStorage from "@react-native-community/async-storage";

async function cacheChannels(channels) {
  try {
    const jsonChannels = JSON.stringify(channels);
    await AsyncStorage.setItem("@channels", jsonChannels);
  } catch (err) {
    console.warn("saving error", err);
  }
}

async function getCachedChannels() {
  try {
    const jsonChannels = await AsyncStorage.getItem("@channels");
    return jsonChannels != null ? JSON.parse(jsonChannels) : null;
  } catch (err) {
    console.warn("error reading cache", err);
  }
}

async function fetchChannels() {
  const cachedChannels = await getCachedChannels();
  if (!cachedChannels || cachedChannels.length == 0) {
    return fetchXML("https://somafm.com/channels.xml").then(
      ({ channels: { channel } }) => {
        cacheChannels(channel);
        return channel;
      }
    );
  }
  return Promise.resolve(cachedChannels);
}

export function useChannels() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    fetchChannels().then(setChannels);
  }, []);
  return channels;
}

function createSections(sections, channel) {
  const genre = channel.genre[0].split("|")[0];
  const existingSectionIdx = sections.findIndex((s) => s.title == genre);
  if (existingSectionIdx != -1) {
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
  return parseInt(b.listeners[0]) - parseInt(a.listeners[0]);
}

function reducer(state, action) {
  switch (action.type) {
    case "all": {
      return {
        type: "all",
        data: action.data,
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
  const [sortedChannels, dispatch] = useReducer(reducer, {
    type: "all",
    data: [],
  });

  useEffect(() => {
    dispatch({ type: "all", data: channels });
  }, [channels]);

  const channelsDispatch = (type) => dispatch({ type, data: channels });

  return [sortedChannels, channelsDispatch];
}
