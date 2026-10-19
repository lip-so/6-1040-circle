/** Ignore replies that arrive after the account or screen state was cleared. */
export class RequestScope {
  private revision = 0;
  invalidate() { this.revision += 1; }
  current() {
    const revision = this.revision;
    return () => revision === this.revision;
  }
}

export async function attempt<T>(request: () => Promise<T>): Promise<T | { error: "NETWORK_ERROR" }> {
  try { return await request(); }
  catch { return { error: "NETWORK_ERROR" }; }
}
