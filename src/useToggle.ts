import { useCallback, useState } from 'react';

/**
 * Custom hook that manages a boolean toggle state.
 * @param initialValue - The initial value for the state (default is `false`).
 * @returns [value, toggle] - The state value and the function to toggle it.
 */
export default function useToggle(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue(prevValue => !prevValue), []);

    return [value, toggle] as const;
}
