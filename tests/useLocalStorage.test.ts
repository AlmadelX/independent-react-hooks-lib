import { act, renderHook } from '@testing-library/react';

import useLocalStorage from '../src/useLocalStorage';

describe('`useLocalStorage()`', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should work with key that doesn't exist in local storage initially", () => {
        const { result } = renderHook(() => useLocalStorage('key', 'default'));

        expect(result.current[0]).toBe('default');
        expect(localStorage.getItem('key')).toBe(JSON.stringify('default'));

        // Set new value
        act(() => {
            result.current[1]('value1');
        });
        expect(result.current[0]).toBe('value1');
        expect(localStorage.getItem('key')).toBe(JSON.stringify('value1'));

        // Remove the value
        act(() => {
            result.current[2]();
        });
        expect(result.current[0]).toBe('default');
        expect(localStorage.getItem('key')).toBeNull();
    });

    it('should work with key that already exists in local storage', () => {
        localStorage.setItem('key', JSON.stringify('value'));
        const { result } = renderHook(() => useLocalStorage('key', 'default'));

        expect(result.current[0]).toBe('value');
        expect(localStorage.getItem('key')).toBe(JSON.stringify('value'));

        // Set new value
        act(() => {
            result.current[1]('value1');
        });
        expect(result.current[0]).toBe('value1');
        expect(localStorage.getItem('key')).toBe(JSON.stringify('value1'));

        // Remove the value
        act(() => {
            result.current[2]();
        });
        expect(result.current[0]).toBe('default');
        expect(localStorage.getItem('key')).toBeNull();
    });

    it('should work on key change', () => {
        interface IProps {
            key: string;
            initialValue: string;
        }

        const initialProps: IProps = { key: 'key1', initialValue: 'default' };
        const { result, rerender } = renderHook(({ key, initialValue }) => useLocalStorage(key, initialValue), {
            initialProps,
        });

        expect(result.current[0]).toBe('default');
        expect(localStorage.getItem('key1')).toBe(JSON.stringify('default'));

        const newProps: IProps = { key: 'key2', initialValue: 'default' };
        rerender(newProps);

        expect(result.current[0]).toBe('default');
        expect(localStorage.getItem('key2')).toBe(JSON.stringify('default'));

        // Set new value
        act(() => {
            result.current[1]('value');
        });
        expect(result.current[0]).toBe('value');
        expect(localStorage.getItem('key2')).toBe(JSON.stringify('value'));
    });
});
