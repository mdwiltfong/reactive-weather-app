import { useEffect, useState } from "react";
/*
The reviver function is used by `JSON.parse()` to convert stored string values into numbers (when appropriate) as well as strings of "undefined" into null.
*/
function reviver(key, value) {
  if (value === "undefined") {
    return null;
  }
  if (parseInt(value)) {
    return parseInt(value);
  }
  return value;
}

/*
Function takes in the key which is used to store the relevant data into the browser's local storage. 
If there is nothing stored in the browser, then a default value is stored into the browser. 
The function returns the state of information in the browser, as well as a setter to change that set outside of the hook. 
*/
const default_storage_state = {
  weatherapp: {
    coords: "undefined",
    token: null,
  },
};

const useLocalStoragestate = (
  key,
  defaultValue = JSON.stringify(default_storage_state)
) => {
  const [state, setState] = useState(() => {
    const coordsString = window.localStorage.getItem(key) || defaultValue;
    let value = JSON.parse(coordsString, reviver);
    return value;
  });
  /*   function _setState(jsonObj) {
    window.localStorage.setItem(key, JSON.stringify(state));
    setState(jsonObj);
  } */
  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
    }, 1000);
  }, [key, state]);
  return [state, setState];
};

export default useLocalStoragestate;
