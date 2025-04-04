class ApiClient {
  static async fetch<T>({
    url,
    options,
  }: {
    url: string;
    options: RequestInit;
  }): Promise<T> {
    const raw = await fetch(url, options);

    if (!raw.ok) {
      throw new Error(`HTTP error: ${raw.status}`);
    }

    const data = await raw.json();

    return data as T;
  }
}

export default ApiClient;
