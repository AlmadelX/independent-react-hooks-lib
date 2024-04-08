import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook that handles the use of browser's session storage as a regular state.
 * !!! This hook doesn't synchrony changes between components.
 * @template T - The type of the state to be stored in the session storage.
 * @param key - The key under which the value will be store in the session storage.
 * @param initialValue - The initial value of the state.
 * @returns [value, setValue, removeValue] - The stored value, the function to set the new value, the function to remove
 * the value.
 */
export default function useSessionStorage<T>(key: string, initialValue: T) {
    const getStoredValue = useCallback(() => {
        const json = sessionStorage.getItem(key);
        if (!json) {
            return initialValue;
        }

        return JSON.parse(json);
    }, [key, initialValue]);

    const [value, setValue] = useState(getStoredValue());

    const setStoredValue = useCallback(
        (newValue: T) => {
            const json = JSON.stringify(newValue);
            sessionStorage.setItem(key, json);

            setValue(newValue);
        },
        [key]
    );

    useEffect(() => {
        setStoredValue(getStoredValue());
    }, [setStoredValue, getStoredValue]);

    const removeStoredValue = useCallback(() => {
        sessionStorage.removeItem(key);

        setValue(initialValue);
    }, [key, initialValue]);

    return [value, setStoredValue, removeStoredValue] as const;
}
