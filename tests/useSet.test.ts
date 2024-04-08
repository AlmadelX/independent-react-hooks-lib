import { act, renderHook } from '@testing-library/react';

import useSet from '../src/useSet';

describe('`useSet()`', () => {
    it('should keep the state of a set', () => {
        const { result } = renderHook(() => useSet(['value1', 'value2']));

        expect(result.current[0].has('value1')).toBeTruthy();
        expect(result.current[0].has('value2')).toBeTruthy();

        // Add the element
        act(() => {
            result.current[1]('value3');
        });
        expect(result.current[0].has('value3')).toBeTruthy();

        // Remove the element
        act(() => {
            result.current[2]('value1');
        });
        expect(result.current[0].has('value1')).toBeFalsy();

        // Reset the map
        act(() => {
            result.current[3]();
        });
        expect(result.current[0].has('value1')).toBeTruthy();
        expect(result.current[0].has('value2')).toBeTruthy();
    });
});
