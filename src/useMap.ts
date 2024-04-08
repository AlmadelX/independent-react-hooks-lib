import { useCallback, useState } from 'react';

/**
 * Custom hook that manages a state of a map.
 * @template K, V - The type of map keys, the type of map values.
 * @param initialState - The initial state of the map (array of key-value pairs).
 * @return [map, remove, set, reset] - The state of the map, the function to delete an element, the function to set the
 * element, the function to reset the map state to the `initialState`.
 */
export default function useMap<K, V>(initialState: [K, V][]) {
    const [map, setMap] = useState(new Map(initialState));

    const remove = useCallback((key: K) => {
        setMap(prevMap => {
            const mapCopy = new Map(prevMap);
            mapCopy.delete(key);

            return mapCopy;
        });
    }, []);

    const set = useCallback((key: K, value: V) => {
        setMap(prevMap => {
            const mapCopy = new Map(prevMap);
            mapCopy.set(key, value);

            return mapCopy;
        });
    }, []);

    const reset = useCallback(() => {
        setMap(new Map(initialState));
    }, [initialState]);

    return [map, remove, set, reset] as const;
}
