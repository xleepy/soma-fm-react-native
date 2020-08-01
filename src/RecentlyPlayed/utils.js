import AsyncStorage from "@react-native-community/async-storage";

export async function getRecentlyPlayed() {
  try {
    const recentlyPlayedItems = await AsyncStorage.getItem("@recently-played");
    return recentlyPlayedItems ? JSON.parse(recentlyPlayedItems) : [];
  } catch (err) {
    console.warn(err);
    return [];
  }
}

export async function addToRecentlyPlayed(channel) {
  const channels = await getRecentlyPlayed();
  const isPlayed = channels.some((ch) => ch.$.id === channel.$.id);
  if (isPlayed) {
    return;
  }
  if (channels.length > 7) {
    channels.splice(channels.length - 3, 3);
  }
  AsyncStorage.setItem(
    "@recently-played",
    JSON.stringify([channel, ...channels])
  );
}
