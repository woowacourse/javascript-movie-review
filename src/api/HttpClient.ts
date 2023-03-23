import {
  APISpec,
  ExtractByEndpoint,
  ExtractByHTTPMethod,
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

  async get<
    GETAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'GET'>,
    Path extends GetPath<GETAPISpec['endpoint']>,
  >(
    path: Path,
    params?: GetParams<ExtractByEndpoint<GETAPISpec, `GET ${Path}`>>,
  ): Promise<ExtractByEndpoint<GETAPISpec, `GET ${Path}`>['response']> {
    const url = this.getURL(path);
    Object.entries(params ?? {}).forEach(([key, value]) =>
      url.searchParams.set(key, String(value)),
    );

    return this.fetch(url, { method: 'GET' });
  }

  async post<
    POSTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'POST'>,
    Path extends GetPath<POSTAPISpec['endpoint']>,
  >(
    path: Path,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<ExtractByEndpoint<POSTAPISpec, `POST ${Path}`>['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'POST', ...init });
  }

  async put<
    PUTAPISpec extends ExtractByHTTPMethod<GenericAPISpec, 'PUT'>,
    Path extends GetPath<PUTAPISpec['endpoint']>,
  >(
    path: Path,
    init?: Omit<RequestInit, 'method'>,
  ): Promise<ExtractByEndpoint<PUTAPISpec, `PUT ${Path}`>['response']> {
    const url = this.getURL(path);

    return this.fetch(url, { method: 'PUT', ...init });
  }
}
