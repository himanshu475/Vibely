import { useState, useEffect } from 'react';

/**
 * Custom React Hook to debounce high-frequency state changes (like keystrokes).
 * This prevents excessive API calls or heavy client-side filtering logic 
 * by forcing the execution to wait for a specified pause duration.
 * 
 * @param {any} value - The changing state to debounce
 * @param {number} delay - Milliseconds to delay execution
 * @returns {any} The debounced value
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to delay the update
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // If the value changes BEFORE the delay finishes, 
    // the cleanup function clears the timeout and starts over!
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
