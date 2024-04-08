import { fireEvent, renderHook } from '@testing-library/react';

import useEventListener from '../src/useEventListener';

declare global {
    interface WindowEventMap {
        'test-event': CustomEvent;
    }
}

const elementRef = { current: document.createElement('div') };
const addEventListenerSpy = vitest.spyOn(window, 'addEventListener');

describe('`useEventListener()`', () => {
    afterEach(() => {
        vitest.clearAllMocks();
    });

    it('should bind and unbind the event on mount and unmount', () => {
        const callback = vitest.fn();
        const { unmount } = renderHook(() => useEventListener('test-event', callback));

        expect(addEventListenerSpy).toHaveBeenCalledWith('test-event', expect.any(Function));

        unmount();

        expect(addEventListenerSpy).toHaveBeenCalledWith('test-event', expect.any(Function));
    });

    it('should call the event listener handler when the event is triggered', () => {
        const callback = vitest.fn();

        renderHook(() => useEventListener('click', callback, elementRef));

        fireEvent.click(elementRef.current);

        expect(callback).toHaveBeenCalled();
    });
});
