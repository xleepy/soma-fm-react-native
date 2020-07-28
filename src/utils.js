import { parseString } from "react-native-xml2js";
import { useContext, useCallback } from "react";
import { SelectedChannelContext } from "./App";
import { useHistory } from "react-router";

export function parseXml(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

export function fetchXML(url) {
  return fetch(url)
    .then((res) => res.text())
    .then(parseXml);
}

export function useChannelSelect(channel, callback) {
  const [, setChannel] = useContext(SelectedChannelContext);
  return useCallback(() => {
    setChannel(channel);
    if (callback) {
      callback();
    }
  }, [channel]);
}

export function useSelectChannelAndRedirect(channel) {
  const history = useHistory();
  return useChannelSelect(channel, () =>
    history.push(`/player/${channel.$.id}`)
  );
}
