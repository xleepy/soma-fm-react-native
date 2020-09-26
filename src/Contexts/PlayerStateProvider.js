import React from "react";
import { usePlayerState } from "../Player/hooks";

export const PlayerStateContext = React.createContext(0);

export function PlayerStateProvider({ children }) {
  const playerState = usePlayerState();
  return (
    <PlayerStateContext.Provider value={playerState || 0}>
      {children}
    </PlayerStateContext.Provider>
  );
}
