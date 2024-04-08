import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that determines if the component is currently mounted.
 * @returns isMountedFn - The function that returns `true` if the component is mounted, otherwise `false`.
 */
export default function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    const isMountedFn = useCallback(() => isMounted.current, []);

    return isMountedFn;
}
