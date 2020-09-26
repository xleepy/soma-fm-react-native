import { useReducer } from "react";
import { fetchXML, useDataFetchEffect } from "../utils";
import AsyncStorage from "@react-native-community/async-storage";
import debounce from "lodash.debounce";

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

async function fetchChannels(force = false) {
  const cachedChannels = await getCachedChannels();
  const cachedChannelsMap = cachedChannels.reduce((channelsMap, channel) => {
    const key = channel.$.id;
    const isExists = channelsMap[key];
    if (isExists) {
      return channelsMap;
    }
    return {
      ...channelsMap,
      [key]: channel,
    };
  }, {});
  const latestFetchTimeStamp = await getLatestFetchTimestamp();
  // latest fetch timestamp + 10 min offset to refetch again on component mount
  const shouldUpdate =
    !!latestFetchTimeStamp &&
    latestFetchTimeStamp + 10 * 60000 - Date.now() <= 0;

  if (cachedChannels.length === 0 || shouldUpdate || force) {
    return fetchXML("https://somafm.com/channels.xml").then(
      ({ channels: { channel } }) => {
        const modifiedChannels = channel.map((ch) => {
          const cachedChannel = cachedChannelsMap[ch.$.id];
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

function createSectionsMap(sectionsMap, channel) {
  const genre = channel.genre[0].split("|")[0];
  const existingSectionChannels = sectionsMap[genre] || [];
  return {
    ...sectionsMap,
    [genre]: [...existingSectionChannels, channel],
  };
}

function sortByListeners(a, b) {
  return Number(b.listeners[0]) - Number(a.listeners[0]);
}

function updateChannels(type, channels = []) {
  switch (type) {
    case "favorite": {
      return channels.filter((channel) => channel.isFavorite);
    }
    case "genre": {
      const sectionsMap = channels.reduce(createSectionsMap, []);
      return Object.keys(sectionsMap).map((section) => {
        return {
          title: section,
          data: sectionsMap[section] || [],
        };
      });
    }
    case "popularity": {
      return channels.slice().sort(sortByListeners);
    }
    default: {
      return channels;
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "fetch": {
      return {
        type: state.type,
        data: updateChannels(state.type, action.data),
        fetchedChannels: action.data,
      };
    }
    case "all": {
      return {
        ...state,
        type: "all",
        data: state.fetchedChannels,
      };
    }
    case "favorite": {
      return {
        ...state,
        type: "favorite",
        data: updateChannels("favorite", state.fetchedChannels),
      };
    }
    case "genre":
      return {
        ...state,
        type: "genre",
        data: updateChannels("genre", state.fetchedChannels),
      };
    case "popularity": {
      return {
        ...state,
        type: "popularity",
        data: updateChannels("popularity", state.fetchedChannels),
      };
    }
    case "toggle-favorite": {
      const modifiedChannels = state.fetchedChannels.map((ch) => {
        if (ch.$.id === action.id) {
          return {
            ...ch,
            isFavorite: !ch.isFavorite,
          };
        }
        return ch;
      });
      cacheChannels(modifiedChannels);

      return {
        ...state,
        type: state.type,
        data: updateChannels(state.type, modifiedChannels),
        fetchedChannels: modifiedChannels,
      };
    }
    default:
      return state;
  }
}
export function useChannels() {
  // TODO: think about better implementation of sorting and toggling favorite btn

  const [channels, dispatch] = useReducer(reducer, {
    type: "all",
    data: [],
    fetchedChannels: [],
  });

  function setChannels(fetchedChannels) {
    dispatch({ type: "fetch", data: fetchedChannels });
  }

  // NOTE: a bit odd should be rewritten i think
  const toggleChannelFavorite = debounce((id) => {
    dispatch({ type: "toggle-favorite", id });
  });

  const [isFetching, refreshChannels] = useDataFetchEffect(
    fetchChannels,
    setChannels,
    (err) => console.warn(err),
    []
  );

  const channelsDispatch = debounce((type) => {
    dispatch({ type });
  });

  return [
    channels,
    channelsDispatch,
    toggleChannelFavorite,
    refreshChannels,
    isFetching,
  ];
}
