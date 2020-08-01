import { parseString } from "react-native-xml2js";
import { useContext, useCallback, useEffect, useState } from "react";
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
  return useChannelSelect(channel, () => history.push(`/player`));
}

function getPromise(promiseOrFunc, force = false) {
  return typeof promiseOrFunc === "function"
    ? promiseOrFunc(force)
    : promiseOrFunc;
}

export function useDataFetchEffect(
  promiseOrFunc,
  onSuccess,
  onError,
  deps = []
) {
  const [isFetching, setFetchingState] = useState(false);
  useEffect(() => {
    let canceled = false;
    const promise = getPromise(promiseOrFunc);
    setFetchingState(true);
    promise
      .then((res) => {
        if (!canceled) {
          // eslint-disable-next-line no-unused-expressions
          onSuccess && onSuccess(res);
          setFetchingState(false);
        }
      })
      .catch((err) => {
        if (!canceled) {
          // eslint-disable-next-line no-unused-expressions
          onError && onError(err);
          setFetchingState(false);
        }
      });
    return () => (canceled = true);
  }, deps);

  const refetch = useCallback(async () => {
    try {
      setFetchingState(true);
      const data = await getPromise(promiseOrFunc, true);
      // eslint-disable-next-line no-unused-expressions
      onSuccess && onSuccess(data);
      setFetchingState(false);
    } catch (err) {
      setFetchingState(false);
      // eslint-disable-next-line no-unused-expressions
      onError && onError(err);
    }
  }, [promiseOrFunc]);
  return [isFetching, refetch];
}

export function useDataFetchCallback(promiseOrFunc, deps = []) {
  const [isFetching, setFetchingState] = useState(false);
  const [data, setData] = useState(null);
  const fetchFunc = useCallback(async () => {
    try {
      setFetchingState(true);
      const fetchedData = await getPromise(promiseOrFunc);
      setData(fetchedData);
    } catch (err) {
      setFetchingState(false);
    }
  }, deps);
  return [{ data, isFetching }, fetchFunc];
}
