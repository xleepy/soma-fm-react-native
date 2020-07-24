import { useEffect, useState } from "react";
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
  // TODO: sorting modes, and callbacks
  return [channels];
}
