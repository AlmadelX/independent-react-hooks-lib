import { renderHook } from '@testing-library/react';

import useIsMounted from '../src/useIsMounted';

describe('`useIsMounted()`', () => {
    it('should determine if the component is mounted', () => {
        const { result, unmount } = renderHook(() => useIsMounted());

        expect(result.current()).toBe(true);

        unmount();

        expect(result.current()).toBe(false);
    });
});
