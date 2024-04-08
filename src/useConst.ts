import { useState } from 'react';

/**
 * Custom hook that provides a constant state value.
 * @template T - The type of the state value.
 * @param initialValue - The initial value for the state.
 * @returns value - The constant state value.
 */
export default function useConst<T>(initialValue: T) {
    const [value] = useState(initialValue);

    return value;
}
