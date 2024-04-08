import { useCallback, useState } from 'react';

/**
 * Custom hook that manages a state of a set.
 * @template T - The type of set values.
 * @param initialState - The initial state of the set (array of values).
 * @return [set, add, remove, reset] - The state of the set, the function to add an element, the function to delete an
 * element, the function to reset the set state to the `initialState`.
 */
export default function useSet<T>(initialState: T[]) {
    const [set, setSet] = useState(new Set(initialState));

    const add = useCallback((value: T) => {
        setSet(prevSet => {
            const setCopy = new Set(prevSet);
            setCopy.add(value);

            return setCopy;
        });
    }, []);

    const remove = useCallback((value: T) => {
        setSet(prevSet => {
            const setCopy = new Set(prevSet);
            setCopy.delete(value);

            return setCopy;
        });
    }, []);

    const reset = useCallback(() => {
        setSet(new Set(initialState));
    }, [initialState]);

    return [set, add, remove, reset] as const;
}
