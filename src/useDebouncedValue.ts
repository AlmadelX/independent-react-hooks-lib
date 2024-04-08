import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook that handles a debounced version of a value.
 * @template T - The type of the debounced value.
 * @param delay - The delay (in millisecond) before the value is updated.
 * @param initialValue - The initial value.
 * @returns [value, updateValue] - The debounced value and the function to update it.
 */
export default function useDebouncedValue<T>(delay: number, initialValue?: T) {
    const [value, setValue] = useState(initialValue);
    const timeoutRef = useRef<number>();

    const clear = useCallback(() => clearTimeout(timeoutRef.current), []);

    useEffect(() => {
        return clear;
    }, [delay, clear]);

    const updateValue = useCallback(
        (newValue: T) => {
            clear();

            timeoutRef.current = setTimeout(() => setValue(newValue), delay);
        },
        [delay, clear]
    );

    return [value, updateValue] as const;
}
