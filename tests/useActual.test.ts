import { renderHook } from '@testing-library/react';

import useActual from '../src/useActual';

describe('`useActual()`', () => {
    it('should return the actual version of the value', () => {
        interface IProps {
            value: string;
        }

        const initialProps: IProps = { value: 'value1' };
        const { result, rerender } = renderHook(({ value }) => useActual(value), {
            initialProps,
        });

        expect(result.current.current).toBe('value1');

        // Change the value
        const newProps1: IProps = { value: 'value2' };
        rerender(newProps1);

        expect(result.current.current).toBe('value2');

        // Change the value
        const newProps2: IProps = { value: 'value3' };
        rerender(newProps2);

        expect(result.current.current).toBe('value3');
    });
});
