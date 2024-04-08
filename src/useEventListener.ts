import { RefObject, useEffect, useRef } from 'react';

/**
 * Custom hook that handles browser events listening.
 * @param eventName - The name of the event to listen to.
 * @param handler - The handler of the event.
 * @param element - The element to attach the event listener to (default is `window`).
 */
export default function useEventListener(eventName: string, handler: EventListener, element?: RefObject<HTMLElement>) {
    const actualHandler = useRef(handler);

    useEffect(() => {
        actualHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const targetElement = element?.current ?? window;

        const listener: EventListener = e => actualHandler.current(e);

        targetElement.addEventListener(eventName, listener);

        return () => targetElement.removeEventListener(eventName, listener);
    }, [eventName, element]);
}
