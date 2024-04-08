import { act, renderHook } from '@testing-library/react';

import useCounter from '../src/useCounter';

describe('`useCounter()`', () => {
    it('should work without `initialValue` provided', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current[0]).toBe(0);

        // Decrement
        act(result.current[1]);
        expect(result.current[0]).toBe(-1);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(0);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(1);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(2);

        // Reset
        act(result.current[3]);
        expect(result.current[0]).toBe(0);
    });

    it('should work with `initialValue` provided', () => {
        const { result } = renderHook(() => useCounter(10));

        expect(result.current[0]).toBe(10);

        // Decrement
        act(result.current[1]);
        expect(result.current[0]).toBe(9);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(10);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(11);

        // Increment
        act(result.current[2]);
        expect(result.current[0]).toBe(12);

        // Reset
        act(result.current[3]);
        expect(result.current[0]).toBe(10);
    });
});
