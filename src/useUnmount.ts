import { useEffect, useRef } from 'react';

/**
 * Custom hook that runs a provided function when the component will unmount.
 * @param callback - The function to be called on onmount.
 */
export default function useUnmount(callback: () => void) {
    const actualCallback = useRef(callback);

    useEffect(() => {
        actualCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        return () => actualCallback.current();
    }, []);
}
