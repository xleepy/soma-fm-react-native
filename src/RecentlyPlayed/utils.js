import AsyncStorage from "@react-native-community/async-storage";

export async function getRecentlyPlayed() {
  try {
    const recentlyPlayedItems = await AsyncStorage.getItem("@recently-played");
    return recentlyPlayedItems ? JSON.parse(recentlyPlayedItems) : [];
  } catch (err) {
    console.warn(err);
  }
}

export async function addToRecentlyPlayed(channel) {
  const items = await getRecentlyPlayed();
  const isPlayed = items.some((ch) => ch.$.id == channel.$.id);
  if (isPlayed) {
    return;
  }
  if (items.length > 7) {
    items.splice(items.length - 3, 3);
  }
  AsyncStorage.setItem("@recently-played", JSON.stringify([channel, ...items]));
}
