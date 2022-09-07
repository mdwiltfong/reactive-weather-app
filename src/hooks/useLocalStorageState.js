import { useEffect, useState } from "react";

const useLocalStoragestate = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    let value = JSON.parse(window.localStorage.getItem(key) || defaultValue);
    return value;
  });
  useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};

export default useLocalStoragestate;
