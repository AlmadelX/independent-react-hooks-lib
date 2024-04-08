import { act, renderHook } from '@testing-library/react';

import useMap from '../src/useMap';

describe('`useMap()`', () => {
    it('should keep the state of a map', () => {
        const { result } = renderHook(() =>
            useMap([
                ['key1', 'value1'],
                ['key2', 'value2'],
            ])
        );

        expect(result.current[0].get('key1')).toBe('value1');
        expect(result.current[0].get('key2')).toBe('value2');

        // Remove the element
        act(() => {
            result.current[1]('key2');
        });
        expect(result.current[0].get('key2')).toBeUndefined();

        // Set the element
        act(() => {
            result.current[2]('key3', 'value3');
        });
        expect(result.current[0].get('key3')).toBe('value3');

        // Reset the map
        act(() => {
            result.current[3]();
        });
        expect(result.current[0].get('key1')).toBe('value1');
        expect(result.current[0].get('key2')).toBe('value2');
    });
});
