import { parseString } from "react-native-xml2js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import {
  SELECT_CHANNEL_ACTION,
  useSelectChannel,
} from "./Contexts/SelectedChannelProvider";

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
  const dispatch = useSelectChannel();
  const callbackRef = useRef(callback);
  return useCallback(() => {
    dispatch({ type: SELECT_CHANNEL_ACTION, channel });
    if (callback) {
      callbackRef.current();
    }
  }, [channel, callbackRef]);
}

export function useSelectChannelAndRedirect(channel) {
  const history = useHistory();
  return useChannelSelect(channel, () => history.push(`/player`));
}

export function useDataFetchEffect(promiseFunc, onSuccess, onError, deps = []) {
  const [isFetching, setFetchingState] = useState(false);
  useEffect(() => {
    let canceled = false;
    async function fetchData() {
      try {
        setFetchingState(true);
        const result = await promiseFunc();
        if (!canceled) {
          onSuccess(result);
          setFetchingState(false);
        }
      } catch (err) {
        onError(err);
        setFetchingState(false);
      }
    }
    fetchData();
    return () => (canceled = true);
  }, deps);

  const refetch = useCallback(async () => {
    try {
      setFetchingState(true);
      const data = (await promiseFunc(true)) || [];
      // eslint-disable-next-line no-unused-expressions
      onSuccess && onSuccess(data);
      setFetchingState(false);
    } catch (err) {
      setFetchingState(false);
      // eslint-disable-next-line no-unused-expressions
      onError && onError(err);
    }
  }, [promiseFunc]);
  return [isFetching, refetch];
}

export function useDataFetchCallback(promiseFunc, deps = []) {
  const [isFetching, setFetchingState] = useState(false);
  const [data, setData] = useState(null);
  const fetchFunc = useCallback(async () => {
    try {
      setFetchingState(true);
      const fetchedData = await promiseFunc();
      setData(fetchedData);
      setFetchingState(false);
    } catch (err) {
      setFetchingState(false);
    }
  }, deps);
  return [{ data, isFetching }, fetchFunc];
}
