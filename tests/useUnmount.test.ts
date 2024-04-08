import { renderHook } from '@testing-library/react';

import useUnmount from '../src/useUnmount';

describe('`useUnmount()`', () => {
    it('should call the callback on onmount', () => {
        const callback = vitest.fn();
        const { unmount } = renderHook(() => useUnmount(callback));

        expect(callback).not.toBeCalled();

        unmount();

        expect(callback).toBeCalled();
    });

    it('should call the the updated callback', () => {
        interface IProps {
            callback: () => void;
        }

        const callback1 = vitest.fn();
        const initialProps: IProps = { callback: callback1 };
        const { rerender, unmount } = renderHook(({ callback }) => useUnmount(callback), {
            initialProps,
        });

        expect(callback1).not.toBeCalled();

        const callback2 = vitest.fn();
        const newProps: IProps = { callback: callback2 };
        rerender(newProps);

        expect(callback1).not.toBeCalled();
        expect(callback2).not.toBeCalled();

        unmount();

        expect(callback1).not.toBeCalled();
        expect(callback2).toBeCalled();
    });
});
