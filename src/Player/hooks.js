import TrackPlayer from "react-native-track-player";
import { useEffect, useCallback } from "react";
import { addToRecentlyPlayed } from "../RecentlyPlayed/utils";

async function setupPlayer() {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_STOP],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_STOP,
    ],
  });
}

export function usePlayerSetup() {
  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);
}

async function play(channel) {
  const {
    title,
    $: { id },
    xlimage,
    description,
    genre,
  } = channel;
  try {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack && currentTrack.id !== id) {
      await TrackPlayer.stop();
      await TrackPlayer.reset();
    }
    await TrackPlayer.add({
      id,
      url: `https://ice5.somafm.com/${id}-128-mp3`,
      title: title[0],
      artwork: xlimage[0],
      artist: description[0],
      genre: genre[0],
    });

    await TrackPlayer.play();
    await addToRecentlyPlayed(channel);
  } catch (err) {
    console.log(err);
  }
}

async function stop() {
  await TrackPlayer.stop();
}

export function usePlayerControls(selectedChannel, callback) {
  const handlePlay = useCallback(() => {
    if (selectedChannel) {
      play(selectedChannel).then(() => callback(selectedChannel));
    }
  }, [selectedChannel]);

  const handleStop = useCallback(() => {
    stop();
  }, []);

  return [handlePlay, handleStop];
}
