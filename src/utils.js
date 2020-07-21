import { parseString } from 'react-native-xml2js';
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
