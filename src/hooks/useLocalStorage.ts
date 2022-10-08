import { useState } from "react";

const useLocalStorage = <T>(
  identifier: string,
  initalValues: T
): [T, (item: T | ((item: T) => T)) => void] => {
  const [values, setValues] = useState<T>(() => {
    const items = window.localStorage.getItem(identifier);

    return items ? JSON.parse(items) : initalValues;
  });

  const set = (item: T | ((item: T) => T)) => {
    const itemToStore = item instanceof Function ? item(initalValues) : item;

    setValues(itemToStore);
    window.localStorage.setItem(identifier, JSON.stringify(itemToStore));
  };

  return [values, set];
};

export default useLocalStorage;
