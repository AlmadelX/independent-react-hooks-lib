import { act, renderHook } from '@testing-library/react';

import useToggle from '../src/useToggle';

describe('`useToggle()`', () => {
    it('should work without `initialValue` provided', () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);

        // Toggle
        act(result.current[1]);

        expect(result.current[0]).toBe(true);
    });

    it('should work with `initialValue` set to `false`', () => {
        const { result } = renderHook(() => useToggle(false));

        expect(result.current[0]).toBe(false);

        // Toggle
        act(result.current[1]);

        expect(result.current[0]).toBe(true);
    });

    it('should work with `initialValue` set to `true`', () => {
        const { result } = renderHook(() => useToggle(true));

        expect(result.current[0]).toBe(true);

        // Toggle
        act(result.current[1]);

        expect(result.current[0]).toBe(false);
    });
});
