import { useEffect, useState } from "react";

function reviver(key, value) {
  if (value === "undefined") {
    return null;
  }
  if (parseInt(value)) {
    return parseInt(value);
  }
  return value;
}

const useLocalStoragestate = (key, defaultValue = '{"coords":"undefined"}') => {
  const [state, setState] = useState(() => {
    const coordsString = window.localStorage.getItem(key) || defaultValue;
    let value = JSON.parse(coordsString, reviver);
    return value;
  });
  function _setState(jsonObj) {
    const jsonString = JSON.stringify(jsonObj);
    setState(jsonString);
  }
  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, _setState];
};

export default useLocalStoragestate;
