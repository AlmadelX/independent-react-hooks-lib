import { useCallback, useState } from 'react';

/**
 * Custom hook that manages boolean state.
 * @param initialValue - The initial value for the boolean state (default is `false`).
 * @returns [value, setValue, toggle, setFalse, setTrue] - The boolean state value, the function to update the value of
 * the state, the function to toggle the state, the function to set state to false, the function to set state to true.
 */
export default function useBoolean(initialValue: boolean = false) {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue(prevValue => !prevValue), []);
    const setFalse = useCallback(() => setValue(false), []);
    const setTrue = useCallback(() => setValue(true), []);

    return [value, toggle, setFalse, setTrue] as const;
}
