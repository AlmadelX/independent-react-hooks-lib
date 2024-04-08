import { useCallback, useState } from 'react';

/**
 * Custom hook that manages a counter state.
 * @param initialValue - The number to start the counter from.
 * @returns [count, decrement, increment, reset] - The state of the counter, the function to decrement the counter, the
 * function to increment the counter, the function to reset the counter state to `initialValue`.
 */
export default function useCounter(initialValue: number = 0) {
    const [count, setCount] = useState(initialValue);

    const decrement = useCallback(() => setCount(prevCount => prevCount - 1), []);
    const increment = useCallback(() => setCount(prevCount => prevCount + 1), []);
    const reset = useCallback(() => setCount(initialValue), [initialValue]);

    return [count, decrement, increment, reset] as const;
}
