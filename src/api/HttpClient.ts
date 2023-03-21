import {
  APISpec,
  ExtractHTTPMethod as ExtractByHTTPMethod,
  GetParams,
  GetPath,
  GetSuccess,
  HTTPResponse,
} from './HttpClient.type';

export abstract class HttpClient<GenericAPISpec extends APISpec> {
  constructor(protected readonly base: string) {}

  isSuccess<GenericHTTPResponse extends HTTPResponse>(
    response: GenericHTTPResponse,
  ): response is GetSuccess<GenericHTTPResponse> {
    return response.ok;
  }

  getURL(path: string): URL {
    return new URL(path, this.base);
  }

  async fetch<GenericHTTPResponse extends HTTPResponse>(
    url: URL,
    init?: RequestInit,
  ): Promise<GenericHTTPResponse> {
    const res = await fetch(url, init);
    return {
      status: res.status,
      ok: res.ok,
      data: await res.json(),
    } as GenericHTTPResponse;
  }

  async get<GETAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'GET'>>(
    path: GetPath<GETAPISpec>,
    params?: GetParams<GETAPISpec>,
  ): Promise<GETAPISpec['response']> {
    const url = this.getURL(path);
    Object.entries(params ?? {}).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    return this.fetch(url, { method: 'GET' });
  }

  async post<POSTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'POST'>>(
    path: GetPath<POSTAPISpec>,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<POSTAPISpec['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'POST', ...init });
  }

  async put<PUTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'PUT'>>(
    path: GetPath<PUTAPISpec>,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<PUTAPISpec['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'PUT', ...init });
  }
}
