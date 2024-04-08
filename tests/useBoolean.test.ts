import { act, renderHook } from '@testing-library/react';

import useBoolean from '../src/useBoolean';

describe('`useBoolean()`', () => {
    it('should work without `initialValue` provided', () => {
        const { result } = renderHook(() => useBoolean());

        expect(result.current[0]).toBe(false);

        // Toggle
        act(result.current[1]);
        expect(result.current[0]).toBe(true);

        // Set to `false`
        act(result.current[2]);
        expect(result.current[0]).toBe(false);

        // Set to `true`
        act(result.current[3]);
        expect(result.current[0]).toBe(true);
    });

    it('should work with `initialValue` set to `false`', () => {
        const { result } = renderHook(() => useBoolean(false));

        expect(result.current[0]).toBe(false);

        // Toggle
        act(result.current[1]);
        expect(result.current[0]).toBe(true);

        // Set to `false`
        act(result.current[2]);
        expect(result.current[0]).toBe(false);

        // Set to `true`
        act(result.current[3]);
        expect(result.current[0]).toBe(true);
    });

    it('should work with `initialValue` set to `true`', () => {
        const { result } = renderHook(() => useBoolean(true));

        expect(result.current[0]).toBe(true);

        // Toggle
        act(result.current[1]);
        expect(result.current[0]).toBe(false);

        // Set to `true`
        act(result.current[3]);
        expect(result.current[0]).toBe(true);

        // Set to `false`
        act(result.current[2]);
        expect(result.current[0]).toBe(false);
    });
});
