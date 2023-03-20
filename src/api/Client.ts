import {
  APISpec,
  ExtractHTTPMethod as ExtractByHTTPMethod,
  GetParams,
  GetPath,
  GetSuccess,
  HTTPResponse,
  HTTPStatus,
} from './Client.type';

export abstract class Client<GenericAPISpec extends APISpec> {
  constructor(protected readonly base: string) {}

  getURL(path: string): URL {
    return new URL(path, this.base);
  }

  async fetch<GenericHTTPResponse extends HTTPResponse>(
    url: URL,
    init?: RequestInit,
  ): Promise<GetSuccess<GenericHTTPResponse>> {
    const res = await fetch(url, init);
    const response = {
      status: res.status as HTTPStatus,
      data: await res.json(),
    } satisfies HTTPResponse;

    if (!res.ok) throw response;

    return response as GetSuccess<HTTPResponse>;
  }

  async get<GETAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'GET'>>(
    path: GetPath<GETAPISpec>,
    params?: GetParams<GETAPISpec>,
  ): Promise<GetSuccess<GETAPISpec['response']>> {
    const url = this.getURL(path);
    Object.entries(params ?? {}).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    return this.fetch(url, { method: 'GET' });
  }

  async post<POSTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'POST'>>(
    path: GetPath<POSTAPISpec>,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<GetSuccess<POSTAPISpec['response']>> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'POST', ...init });
  }

  async put<PUTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'PUT'>>(
    path: GetPath<PUTAPISpec>,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<GetSuccess<PUTAPISpec['response']>> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'PUT', ...init });
  }
}
