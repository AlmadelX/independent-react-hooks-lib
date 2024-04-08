import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that handles a debounced version of a callback.
 * @template T - The type of the debounced function.
 * @param callback - The callback to be debounced.
 * @param delay - The delay (in millisecond) before the value is updated.
 * @returns debouncedCallback - The debounced callback.
 */
export default function useDebounce<T extends (...args: unknown[]) => ReturnType<T>>(callback: T, delay: number) {
    const actualCallback = useRef(callback);
    const actualDelay = useRef(delay);
    const timeoutRef = useRef<number>();

    const clear = useCallback(() => clearTimeout(timeoutRef.current), []);

    useEffect(() => {
        actualCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        actualDelay.current = delay;

        return clear;
    }, [delay, clear]);

    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            clear();

            timeoutRef.current = setTimeout(() => actualCallback.current(...args), actualDelay.current);
        },
        [clear]
    );

    return debouncedCallback;
}
