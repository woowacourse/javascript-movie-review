interface GetDataInterface {
  url: string;
  headers: HeadersInit;
  handleError: (response: Response) => Promise<void>;
}

export interface DataFetcher {
  getData<T>({ url, headers, handleError }: GetDataInterface): Promise<T>;
}

class Fetcher {
  async getData<T>({ url, headers, handleError }: GetDataInterface): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers(headers),
    });

    if (!response.ok) await handleError(response);

    return response.json();
  }
}

export default Fetcher;
