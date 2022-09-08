import { useEffect, useState } from "react";

function reviver(key, value) {
  return isNaN(value) ? undefined : Number(value);
}

const useLocalStoragestate = (key, defaultValue = '{"coords":"undefined"}') => {
  const [state, setState] = useState(() => {
    const coordsString = window.localStorage.getItem(key) || defaultValue;
    let value = JSON.parse(coordsString, reviver);
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};

export default useLocalStoragestate;
