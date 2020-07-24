import { parseString } from "react-native-xml2js";
import { useContext, useCallback } from "react";
import { SelectedChannelContext } from "./App";
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
    callback && callback();
  }, [channel]);
}
