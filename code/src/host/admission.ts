/** Hold admission through response completion AND causal settlement, even after timeouts. */
export function serializeApi(handle: (request: Request) => Response | Promise<Response>, whenIdle: () => Promise<unknown>) {
    let tail: Promise<unknown> = Promise.resolve();
    return (request: Request): Promise<Response> => {
        const invocation = tail.then(async () => {
            try {
                return await handle(request);
            }
            finally {
                await whenIdle();
            }
        });
        tail = invocation.then(() => undefined, () => undefined);
        return invocation;
    };
}
