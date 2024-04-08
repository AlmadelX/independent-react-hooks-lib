import { useRef } from 'react';

/**
 * Custom hook that gives access to the previous version of the value.
 * @template T - The type of the value.
 * @param value - The value to keep the previous version of.
 * @return previousValue - The previous version of the value.
 */
export default function usePrevious<T>(value: T) {
    const currentValue = useRef(value);
    const previousValue = useRef<T | undefined>();

    if (value !== currentValue.current) {
        previousValue.current = currentValue.current;
        currentValue.current = value;
    }

    return previousValue.current;
}
