import { act, renderHook } from '@testing-library/react';

import useCycledValues from '../src/useCycledValues';

describe('`useCycledValues()`', () => {
    it('should work without `startIndex` provided', () => {
        const values = ['value1', 'value2', 'value3'];
        const { result } = renderHook(() => useCycledValues(values));

        expect(result.current[0]).toBe('value1');

        // Test `setPrevValue`

        act(result.current[1]);
        expect(result.current[0]).toBe('value3');

        act(result.current[1]);
        expect(result.current[0]).toBe('value2');

        act(result.current[1]);
        expect(result.current[0]).toBe('value1');

        // Test `setNextValue`

        act(result.current[2]);
        expect(result.current[0]).toBe('value2');

        act(result.current[2]);
        expect(result.current[0]).toBe('value3');

        act(result.current[2]);
        expect(result.current[0]).toBe('value1');
    });

    it('should work with `startIndex` provided', () => {
        const values = ['value1', 'value2', 'value3'];
        const { result } = renderHook(() => useCycledValues(values, 2));

        expect(result.current[0]).toBe('value3');

        // Test `setPrevValue`

        act(result.current[1]);
        expect(result.current[0]).toBe('value2');

        act(result.current[1]);
        expect(result.current[0]).toBe('value1');

        act(result.current[1]);
        expect(result.current[0]).toBe('value3');

        // Test `setNextValue`

        act(result.current[2]);
        expect(result.current[0]).toBe('value1');

        act(result.current[2]);
        expect(result.current[0]).toBe('value2');

        act(result.current[2]);
        expect(result.current[0]).toBe('value3');
    });

    it('should ignore new arguments provided', () => {
        interface IProps {
            values: string[];
            startIndex: number;
        }

        const initialProps: IProps = {
            values: ['value1', 'value2', 'value3'],
            startIndex: 0,
        };
        const { result, rerender } = renderHook(({ values, startIndex }) => useCycledValues(values, startIndex), {
            initialProps,
        });

        expect(result.current[0]).toBe('value1');

        const newProps: IProps = { values: ['A', 'B', 'C'], startIndex: 1 };
        rerender(newProps);

        expect(result.current[0]).toBe('value1');
    });
});
