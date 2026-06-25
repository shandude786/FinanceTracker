import { useState } from 'react';

/**
 * A generic hook that syncs state to localStorage.
 * @param {string} key  - localStorage key
 * @param {*} initialValue - default value if nothing is stored
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) return JSON.parse(item);
      // First launch — persist the initial value so seed data survives refresh
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      // silently ignore storage quota errors
    }
  };

  return [storedValue, setValue];
};
