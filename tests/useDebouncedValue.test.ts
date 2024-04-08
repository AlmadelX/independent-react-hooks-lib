import { act, renderHook } from '@testing-library/react';

import useDebouncedValue from '../src/useDebouncedValue';

describe('`useDebouncedValue()`', () => {
    vitest.useFakeTimers();

    it('should debounce the update of the value', () => {
        const { result } = renderHook(() => useDebouncedValue(1000, 'initial'));

        expect(result.current[0]).toBe('initial');

        // Perform updates
        act(() => {
            result.current[1]('value1');
            result.current[1]('value2');
            result.current[1]('value3');
        });

        expect(result.current[0]).toBe('initial');

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe('initial');

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe('value3');

        // Advance timers again
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe('value3');

        // Perform updates again
        act(() => {
            result.current[1]('value4');
            result.current[1]('value5');
        });

        expect(result.current[0]).toBe('value3');

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        expect(result.current[0]).toBe('value3');

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe('value5');
    });

    it('should clear the previous timeout when `delay` is updated', () => {
        interface IProps {
            delay: number;
            value: string;
        }

        const initialProps: IProps = { delay: 1000, value: 'initial' };
        const { result, rerender } = renderHook(({ delay, value }) => useDebouncedValue(delay, value), {
            initialProps,
        });

        expect(result.current[0]).toBe('initial');

        // Perform the update
        act(() => {
            result.current[1]('value1');
        });

        expect(result.current[0]).toBe('initial');

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        const newProps: IProps = { delay: 3000, value: 'value2' };
        rerender(newProps);

        // Advance timers by the old `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe('initial');
    });

    it('should not clear the previous timeout when `delay` is not changed', () => {
        interface IProps {
            delay: number;
            value: string;
        }

        const initialProps: IProps = { delay: 1000, value: 'initial' };
        const { result, rerender } = renderHook(({ delay, value }) => useDebouncedValue(delay, value), {
            initialProps,
        });

        expect(result.current[0]).toBe('initial');

        // Perform the update
        act(() => {
            result.current[1]('value1');
        });

        expect(result.current[0]).toBe('initial');

        // Advance timers by less than `delay`
        act(() => {
            vitest.advanceTimersByTime(500);
        });

        const newProps: IProps = { delay: 1000, value: 'value2' };
        rerender(newProps);

        // Advance timers by the `delay`
        act(() => {
            vitest.advanceTimersByTime(1000);
        });

        expect(result.current[0]).toBe('value1');
    });
});
