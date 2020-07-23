import TrackPlayer from "react-native-track-player";
import { useEffect, useCallback } from "react";

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

export function usePlayerControls(selectedChannel, callback) {
  const play = useCallback(() => {
    (async function () {
      if (!selectedChannel) {
        return;
      }
      const {
        title,
        $: { id },
        xlimage,
        description,
        genre,
      } = selectedChannel;
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack && currentTrack.id != id) {
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
      callback(selectedChannel);
    })();
  }, [selectedChannel]);

  const stop = useCallback(() => {
    (async function () {
      await TrackPlayer.stop();
    })();
  }, []);

  return [play, stop];
}
