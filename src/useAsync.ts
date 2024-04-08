import { DependencyList, useEffect, useRef, useState } from 'react';

export type TAsyncState<T> =
    | {
          loadingState: 'not-invoked';
      }
    | {
          loadingState: 'loading';
      }
    | {
          loadingState: 'loaded';
          error: unknown;
      }
    | {
          loadingState: 'loaded';
          value: T;
      };

/**
 * Custom hook that handles the asynchronous call.
 * @template T - The type of the callback return value.
 * @param callback - The async callback.
 * @param deps - The dependencies array.
 * @returns asyncState - The current state of the call.
 */
export default function useAsync<T>(callback: () => Promise<T>, deps: DependencyList = []) {
    const actualCallback = useRef(callback);
    const isMounted = useRef(false);

    const [state, setState] = useState<TAsyncState<T>>({ loadingState: 'not-invoked' });

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        actualCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        setState({ loadingState: 'loading' });

        actualCallback
            .current()
            .then(value => {
                if (isMounted.current) {
                    setState({ loadingState: 'loaded', value });
                }
            })
            .catch(error => {
                if (isMounted.current) {
                    setState({ loadingState: 'loaded', error });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);

    return state;
}
