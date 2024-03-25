export interface HttpFetcher {
  get: <T>(url: string) => Promise<T>;
}
