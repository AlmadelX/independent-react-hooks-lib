import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that creates an interval that invokes a callback function at a specified delay.
 * @param callback - The function to be invoked.
 * @param delay - The delay (in milliseconds) between each invocation of the callback.
 * @returns [clear, reset] - The function to clear the interval, the function to reset the interval.
 */
export default function useInterval(callback: () => void, delay: number) {
    const actualCallback = useRef(callback);
    const actualDelay = useRef(delay);
    const intervalRef = useRef<number>();

    useEffect(() => {
        actualCallback.current = callback;
    }, [callback]);

    const start = useCallback(() => {
        intervalRef.current = setInterval(() => actualCallback.current(), actualDelay.current);
    }, []);

    const clear = useCallback(() => clearInterval(intervalRef.current), []);

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
