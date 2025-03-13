import { useState, useEffect } from "react";
import _ from "lodash";

/**
 * Custom hook for debouncing a value
 * @param value The value to debounce
 * @param delay The debounce delay in milliseconds (default: 500ms)
 * @returns The debounced value
 */
const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = _.debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
