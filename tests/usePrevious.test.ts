import { renderHook } from '@testing-library/react';

import usePrevious from '../src/usePrevious';

describe('`usePrevious()`', () => {
    it('should return the previous version of the value', () => {
        interface IProps {
            value: string;
        }

        const initialProps: IProps = { value: 'value1' };
        const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
            initialProps,
        });

        expect(result.current).toBeUndefined();

        // Change the value
        const newProps1: IProps = { value: 'value2' };
        rerender(newProps1);

        expect(result.current).toBe('value1');

        // Change the value
        const newProps2: IProps = { value: 'value3' };
        rerender(newProps2);

        expect(result.current).toBe('value2');
    });
});
