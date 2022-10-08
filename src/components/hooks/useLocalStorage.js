import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    return getLocalStorageValue(key, initialValue);
  });

  const setValue = (value) => {
    const typeOfValue =
      value instanceof Function ? value(localStorageValue) : value;

    setLocalStorageValue(typeOfValue);

    localStorage.setItem(key, JSON.stringify(typeOfValue));
  };

  return [localStorageValue, setValue];
}

function getLocalStorageValue(key, initialValue) {
  const itemFromStorage = localStorage.getItem(key);

  return itemFromStorage ? JSON.parse(itemFromStorage) : initialValue;
}

export default useLocalStorage;
