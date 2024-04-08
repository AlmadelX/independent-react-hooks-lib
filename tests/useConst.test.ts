import { renderHook } from '@testing-library/react';

import useConst from '../src/useConst';

describe('`useConst()`', () => {
    it('should keep value constant', () => {
        interface IProps {
            initialValue: string;
        }

        const initialProps: IProps = { initialValue: 'constant' };
        const { result, rerender } = renderHook(({ initialValue }) => useConst(initialValue), {
            initialProps,
        });

        expect(result.current).toBe('constant');

        const newProps: IProps = { initialValue: 'variable' };
        rerender(newProps);

        expect(result.current).toBe('constant');
    });
});
