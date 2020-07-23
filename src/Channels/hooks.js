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

export function useChannels() {
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    let canceled = false;
    if (channels.length > 0) {
      return;
    }
    (async function () {
      const cachedChannels = await getCachedChannels();
      console.log(cachedChannels);
      if (!cachedChannels || cachedChannels.length == 0) {
        const {
          channels: { channel },
        } = await fetchXML("https://somafm.com/channels.xml");
        if (!canceled) {
          setChannels(channel);
          cacheChannels(channel);
        }
      } else {
        if (!canceled) {
          setChannels(cachedChannels);
        }
      }
    })();
    return () => {
      canceled = true;
    };
  }, []);
  // TODO: sorting modes, and callbacks
  return [channels];
}
