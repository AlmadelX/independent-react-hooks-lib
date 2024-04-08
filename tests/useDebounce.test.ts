import { act, renderHook } from '@testing-library/react';

import useDebounce from '../src/useDebounce';

describe('`useDebounce()`', () => {
    vitest.useFakeTimers();

    it('should debounce the callback', () => {
        const callback = vitest.fn();
        const { result } = renderHook(() => useDebounce(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        // Perform the invocations.
        act(() => {
            result.current();
            result.current();
            result.current();
        });

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

        expect(callback).toHaveBeenCalledTimes(1);

        // Advance timers again
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledTimes(1);

        // Perform updates again
        act(() => {
            result.current();
            result.current();
        });

        expect(callback).toHaveBeenCalledTimes(1);

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(callback).toHaveBeenCalledTimes(1);

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should not invoke the callback after unmount', () => {
        const callback = vitest.fn();
        const { unmount } = renderHook(() => useDebounce(callback, 1000));

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

    it('should update the `callback` function', () => {
        interface IProps {
            callback: () => void;
            delay: number;
        }

        const callback1 = vitest.fn();
        const initialProps: IProps = { callback: callback1, delay: 1000 };
        const { result, rerender } = renderHook(({ callback, delay }) => useDebounce(callback, delay), {
            initialProps,
        });

        expect(callback1).not.toHaveBeenCalled();

        // Perform the update
        act(() => {
            result.current();
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
        const { result, rerender } = renderHook(({ callback, delay }) => useDebounce(callback, delay), {
            initialProps,
        });

        expect(callback).not.toHaveBeenCalled();

        // Perform the update
        act(() => {
            result.current();
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

        // Perform the update
        act(() => {
            result.current();
        });

        // Advance timers by the new `delay`
        act(() => {
            vitest.advanceTimersByTime(3000);
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
