import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Custom hook that manages countdown.
 * @param initialCount - The number to start the countdown from.
 * @param interval - The interval between countdown updates.
 * @returns [count, start, stop, reset] - The state of the countdown, the function to start the countdown, the function
 * to stop the countdown, the function to reset the countdown state.
 */
export default function useCountdown(initialCount: number, interval: number) {
    const [actualInitialCount] = useState(initialCount);
    const [count, setCount] = useState(actualInitialCount);

    const actualInterval = useRef(interval);
    const isRunning = useRef(false);
    const intervalRef = useRef<number>();
    const updateCountdown = useRef<() => void>();

    const stop = useCallback(() => {
        isRunning.current = false;
        clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        return stop;
    }, [stop]);

    useEffect(() => {
        updateCountdown.current = () => {
            if (!count) {
                stop();
                return;
            }

            setCount(count - 1);
        };
    }, [count, stop]);

    const start = useCallback(() => {
        isRunning.current = true;
        intervalRef.current = setInterval(() => updateCountdown.current?.(), actualInterval.current);
    }, []);

    useEffect(() => {
        if (isRunning.current) {
            stop();
            actualInterval.current = interval;
            start();
        }
    }, [interval, stop, start]);

    const reset = useCallback(() => {
        stop();
        setCount(actualInitialCount);
    }, [stop, actualInitialCount]);

    return [count, start, stop, reset] as const;
}
