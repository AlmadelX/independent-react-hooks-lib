import { useCallback, useState } from 'react';

/**
 * Custom hooks that allows to use the value from a cycled list as a state.
 * @template T - The type of the cycled list.
 * @param values - The cycled list.
 * @param startIndex - Index of the initial state value.
 * @returns [value, setPrevValue, setNextValue] - The current state value, function to set the previous value, function
 * to set the next value.
 */
export default function useCycledValues<T extends unknown[]>(values: T, startIndex: number = 0) {
    const [actualValues] = useState(values);
    const [curIndex, setCurIndex] = useState(startIndex);

    const setPrevValue = useCallback(() => {
        setCurIndex(oldIndex => (oldIndex - 1 + actualValues.length) % actualValues.length);
    }, [actualValues.length]);

    const setNextValue = useCallback(() => {
        setCurIndex(oldIndex => (oldIndex + 1) % actualValues.length);
    }, [actualValues.length]);

    return [actualValues[curIndex], setPrevValue, setNextValue] as const;
}
