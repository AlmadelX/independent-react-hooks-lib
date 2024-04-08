import { act, renderHook } from '@testing-library/react';

import useSessionStorage from '../src/useSessionStorage';

describe('`useSessionStorage()`', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it("should work with the key that doesn't exist in the session storage initially", () => {
        const { result } = renderHook(() => useSessionStorage('key', 'default'));

        expect(result.current[0]).toBe('default');
        expect(sessionStorage.getItem('key')).toBe(JSON.stringify('default'));

        // Set new value
        act(() => {
            result.current[1]('value1');
        });
        expect(result.current[0]).toBe('value1');
        expect(sessionStorage.getItem('key')).toBe(JSON.stringify('value1'));

        // Remove the value
        act(() => {
            result.current[2]();
        });
        expect(result.current[0]).toBe('default');
        expect(sessionStorage.getItem('key')).toBeNull();
    });

    it('should work with the key that already exists in the session storage', () => {
        sessionStorage.setItem('key', JSON.stringify('value'));
        const { result } = renderHook(() => useSessionStorage('key', 'default'));

        expect(result.current[0]).toBe('value');
        expect(sessionStorage.getItem('key')).toBe(JSON.stringify('value'));

        // Set new value
        act(() => {
            result.current[1]('value1');
        });
        expect(result.current[0]).toBe('value1');
        expect(sessionStorage.getItem('key')).toBe(JSON.stringify('value1'));

        // Remove the value
        act(() => {
            result.current[2]();
        });
        expect(result.current[0]).toBe('default');
        expect(sessionStorage.getItem('key')).toBeNull();
    });

    it('should work on key change', () => {
        interface IProps {
            key: string;
            initialValue: string;
        }

        const initialProps: IProps = { key: 'key1', initialValue: 'default' };
        const { result, rerender } = renderHook(({ key, initialValue }) => useSessionStorage(key, initialValue), {
            initialProps,
        });

        expect(result.current[0]).toBe('default');
        expect(sessionStorage.getItem('key1')).toBe(JSON.stringify('default'));

        const newProps: IProps = { key: 'key2', initialValue: 'default' };
        rerender(newProps);

        expect(result.current[0]).toBe('default');
        expect(sessionStorage.getItem('key2')).toBe(JSON.stringify('default'));

        // Set new value
        act(() => {
            result.current[1]('value');
        });
        expect(result.current[0]).toBe('value');
        expect(sessionStorage.getItem('key2')).toBe(JSON.stringify('value'));
    });
});
