import { makeStore } from "./utils";

export const SELECT_CHANNEL_ACTION = "SELECT_CHANNEL";

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_CHANNEL_ACTION:
      return {
        ...state,
        selectedChannel: action.channel,
      };
    default: {
      return {
        selectedChannel: null,
      };
    }
  }
};

const [
  SelectedChannelProvider,
  useSelectChannel,
  useSelectedChannel,
] = makeStore(reducer, { selectedChannel: null });

export { SelectedChannelProvider, useSelectChannel, useSelectedChannel };
