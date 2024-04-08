import { act, renderHook } from '@testing-library/react';

import useTimeout from '../src/useTimeout';

describe('`useTimeout()`', () => {
    vitest.useFakeTimers();

    it('should invoke the callback on timeout', () => {
        const callback = vitest.fn();
        renderHook(() => useTimeout(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalled();
    });

    it('should not invoke the callback after unmount', () => {
        const callback = vitest.fn();
        const { unmount } = renderHook(() => useTimeout(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(callback).not.toHaveBeenCalled();

        unmount();

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should clear the timeout', () => {
        const callback = vitest.fn();
        const { result } = renderHook(() => useTimeout(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(callback).not.toHaveBeenCalled();

        // Clear the timeout
        act(() => {
            result.current[0]();
        });

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should reset the timeout', () => {
        const callback = vitest.fn();
        const { result } = renderHook(() => useTimeout(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(callback).not.toHaveBeenCalled();

        // Reset the timeout
        act(() => {
            result.current[1]();
        });

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(600);
        });

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalled();
    });

    it('should update the `callback` function', () => {
        interface IProps {
            callback: () => void;
            delay: number;
        }

        const callback1 = vitest.fn();
        const initialProps: IProps = { callback: callback1, delay: 1000 };
        const { rerender } = renderHook(({ callback, delay }) => useTimeout(callback, delay), {
            initialProps,
        });

        expect(callback1).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        const callback2 = vitest.fn();
        const newProps: IProps = { callback: callback2, delay: 1000 };
        rerender(newProps);

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should clear the previous timeout when `delay` is updated', () => {
        interface IProps {
            callback: () => void;
            delay: number;
        }

        const callback = vitest.fn();
        const initialProps: IProps = { callback, delay: 1000 };
        const { rerender } = renderHook(({ callback, delay }) => useTimeout(callback, delay), {
            initialProps,
        });

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        const newProps: IProps = { callback, delay: 3000 };
        rerender(newProps);

        // Advance timers by the old `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).not.toHaveBeenCalled();

        // Advance timers by the new `interval`
        act(() => {
            vitest.advanceTimersByTime(3000);
        });

        expect(callback).toHaveBeenCalled();
    });
});
