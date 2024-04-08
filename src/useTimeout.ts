import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that creates a timeout that invokes a callback function at a specified delay.
 * @param callback - The function to be invoked.
 * @param delay - The delay (in milliseconds) before the callback is invoked.
 * @returns [clear, reset] - The function to clear the timeout, the function to reset the timeout.
 */
export default function useTimeout(callback: () => void, delay: number) {
    const actualCallback = useRef(callback);
    const actualDelay = useRef(delay);
    const timeoutRef = useRef<number>();

    useEffect(() => {
        actualCallback.current = callback;
    }, [callback]);

    const start = useCallback(() => {
        timeoutRef.current = setTimeout(() => actualCallback.current(), actualDelay.current);
    }, []);

    const clear = useCallback(() => clearTimeout(timeoutRef.current), []);

    useEffect(() => {
        actualDelay.current = delay;
        start();

        return clear;
    }, [delay, start, clear]);

    const reset = useCallback(() => {
        clear();
        start();
    }, [clear, start]);

    return [clear, reset] as const;
}
