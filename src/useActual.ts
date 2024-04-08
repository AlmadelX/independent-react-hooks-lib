import { useEffect, useRef } from 'react';

/**
 * Custom hook that keeps the actual version of the value.
 * @template T - The type of the value.
 * @param value - The value to keep.
 * @return actualValue - The object with a field `current` corresponding to the actual version of the value.
 */
export default function useActual<T>(value: T) {
    const actualValue = useRef(value);

    useEffect(() => {
        actualValue.current = value;
    }, [value]);

    return actualValue as { readonly current: T };
}
