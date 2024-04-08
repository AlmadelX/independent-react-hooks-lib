import { RenderHookResult, renderHook, waitFor } from '@testing-library/react';

import useAsync, { TAsyncState } from '../src/useAsync';

describe('`useAsync()`', () => {
    describe('resolve', () => {
        let hook: RenderHookResult<TAsyncState<string>, { fn: () => Promise<string> }>;
        let callCount = 0;

        const resolveFn = async () => {
            return new Promise((resolve: (arg: string) => void) => {
                callCount++;

                const wait = setTimeout(() => {
                    clearTimeout(wait);
                    resolve('ok');
                }, 0);
            });
        };

        beforeEach(() => {
            callCount = 0;
            hook = renderHook(({ fn }) => useAsync(fn, []), {
                initialProps: {
                    fn: resolveFn,
                },
            });
        });

        it('starts loading', async () => {
            expect(hook.result.current.loadingState).toBe('loading');
            await waitFor(() => expect(callCount).toBe(1));
        });

        it('resolves', async () => {
            hook.rerender({ fn: resolveFn });

            await waitFor(() => expect(callCount).toBe(1));
            assert(hook.result.current.loadingState === 'loaded');
            assert(!('error' in hook.result.current));
            expect(hook.result.current.value).toBe('ok');
        });
    });

    describe('reject', () => {
        let hook: RenderHookResult<TAsyncState<unknown>, { fn: () => Promise<unknown> }>;
        let callCount = 0;

        const rejectFn = async () => {
            return new Promise((_, reject) => {
                callCount++;

                const wait = setTimeout(() => {
                    clearTimeout(wait);
                    reject('not ok');
                }, 0);
            });
        };

        beforeEach(() => {
            callCount = 0;
            hook = renderHook(({ fn }) => useAsync(fn, []), {
                initialProps: {
                    fn: rejectFn,
                },
            });
        });

        it('starts loading', async () => {
            expect(hook.result.current.loadingState).toBe('loading');
            await waitFor(() => expect(callCount).toBe(1));
        });

        it('rejects', async () => {
            hook.rerender({ fn: rejectFn });

            await waitFor(() => expect(callCount).toBe(1));
            assert(hook.result.current.loadingState === 'loaded');
            assert(!('value' in hook.result.current));
            expect(hook.result.current.error).toBe('not ok');
        });
    });
});
