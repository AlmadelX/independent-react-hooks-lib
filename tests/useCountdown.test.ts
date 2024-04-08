import { act, renderHook } from '@testing-library/react';

import useCountdown from '../src/useCountdown';

describe('`useCountdown()`', () => {
    vitest.useFakeTimers();

    it('should start the countdown', () => {
        const { result } = renderHook(() => useCountdown(3, 1000));

        expect(result.current[0]).toBe(3);

        // Start the countdown
        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by less than `interval`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(2);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(1);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(0);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        // Should stop the countdown on `0`
        expect(result.current[0]).toBe(0);
    });

    it('should stop the countdown', () => {
        const { result } = renderHook(() => useCountdown(3, 1000));

        expect(result.current[0]).toBe(3);

        // Start the countdown
        act(() => {
            result.current[1]();
        });

        // Advance timers by less than `interval`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(2);

        // Stop the countdown
        act(() => {
            result.current[2]();
        });

        expect(result.current[0]).toBe(2);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(2);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(2);
    });

    it('should reset the countdown', () => {
        const { result } = renderHook(() => useCountdown(3, 1000));

        expect(result.current[0]).toBe(3);

        // Start the countdown
        act(() => {
            result.current[1]();
        });

        // Advance timers by less than `interval`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(2);

        // Reset the countdown
        act(() => {
            result.current[3]();
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(3);
    });

    it('should clear the previous interval when `interval` is updated', () => {
        interface IProps {
            initialCount: number;
            interval: number;
        }

        const initialProps: IProps = { initialCount: 3, interval: 1000 };
        const { result, rerender } = renderHook(({ initialCount, interval }) => useCountdown(initialCount, interval), {
            initialProps,
        });

        expect(result.current[0]).toBe(3);

        // Start the countdown
        act(() => {
            result.current[1]();
        });

        // Advance timers by less than `interval`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe(3);

        const newProps: IProps = { initialCount: 3, interval: 3000 };
        rerender(newProps);

        // Advance timers by the old `interval`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe(3);

        // Advance timers by the new `interval`
        act(() => {
            vitest.advanceTimersByTime(3000);
        });

        expect(result.current[0]).toBe(2);
    });
});
